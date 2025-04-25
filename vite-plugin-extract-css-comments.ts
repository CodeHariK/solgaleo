// vite-plugin-extract-css-comments.ts
import fs from "fs";
import path from "path";
import { Plugin } from "vite";
import { SafeString } from "./src/utils/regex";

const CSS_COMMENT_STRING_REGEX = /\/\*\s*CSS:\*\s*([\s\S]*?)\*\//gm;
const FUNCTION_DOC_REGEX = /\/\/FN:START\s*([\s\S]*?)\/\/FN:(DOC|END)\s*([\s\S]*?)\/\/FN:END/g;
const EXPORT_REGEX = /export\s+(?:const|let|var|function|class|type|interface|enum)/;
const NESTED_VAR_REGEX = /sol\((--[\w-]+)(?:\s*,\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*))?\)/g;

let FINAL_ROOT_VARS: Record<string, string> = {};
let FINAL_LIGHT_VARS: Record<string, string> = {};
let FINAL_NIGHT_VARS: Record<string, string> = {};
let FINAL_FILE_CSS: string[] = [];
let FINAL_UNIQUE_CLASS_SELECTORS: Set<string> = new Set();

let ROOT_VARS: Record<string, string> = {};
let LIGHT_VARS: Record<string, string> = {};
let NIGHT_VARS: Record<string, string> = {};
let FILE_CSS: string[] = [];
let UNIQUE_CLASS_SELECTORS: Set<string> = new Set();

let FUNCTION_DOCS: { element: string, doc: string, data: string }[] = [];

let PROCESSED_FILES = new Map<string, ProcessedFile>();

function processNestedVars(text: string): string {
    let result = text;
    let lastResult;

    // Keep processing until no more changes are made
    do {
        lastResult = result;
        result = result.replace(NESTED_VAR_REGEX, (_match, name, value) => {
            name = name.trim();

            if (value) {
                // Process any nested var() in the value first
                const processedValue = processNestedVars(value);
                const values = processedValue.split(',').map(v => v.trim());

                if (values.length > 1) {
                    LIGHT_VARS[name] = values[0];
                    NIGHT_VARS[name] = values[1];
                } else {
                    ROOT_VARS[name] = values[0];
                }
            } else if (!ROOT_VARS[name]) {
                ROOT_VARS[name] = "";
            }

            return `var(${name})`;
        });
    } while (result !== lastResult);

    return result;
}

function ProcessCSS(input: string) {
    const lines = input.split(/(?<=[;{}]|\/\/.*)\s*\n/)

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        let trimLine = line.trim()

        if (trimLine.startsWith("//") || !trimLine) {
            continue;
        }

        { // Match selectors before { or with :pseudo-classes
            if (!trimLine.includes(":") || trimLine.includes("{")) {
                // Match class selectors before { or , but not inside property values
                const CLASS_REGEX = /(?:^|\s)(\.[\w-]+)(?=[\s,{]|$)/g;
                const matches = line.matchAll(CLASS_REGEX);

                for (const match of matches) {
                    UNIQUE_CLASS_SELECTORS.add(match[1].trim());
                }
            }
        }

        line = processNestedVars(line);


        if (!trimLine.startsWith("sol(")) {
            FILE_CSS.push(line)
        }
    }
}

type ProcessedFile = {
    path: string;
    hasStyles: boolean;
    hasExports: boolean;
}

export default function ExtractCssComments(dir: string): Plugin {

    return {
        name: 'vite-plugin-extract-css-comments',

        async buildStart() {
            await runExtract(dir);
        },

        configureServer(server) {
            server.watcher.on('change', async (changedPath) => {
                if (changedPath.endsWith('.tsx')) {
                    await runExtract(dir);
                }
            });
        },
    };
}

async function runExtract(dir) {
    await processDirectory(dir);

    if (dir == 'src') {
        LIGHT_VARS = FINAL_LIGHT_VARS
        NIGHT_VARS = FINAL_NIGHT_VARS
        ROOT_VARS = FINAL_ROOT_VARS
        FILE_CSS = FINAL_FILE_CSS
        UNIQUE_CLASS_SELECTORS = FINAL_UNIQUE_CLASS_SELECTORS

        await writeCssTs(dir);
    }

    LIGHT_VARS = {};
    NIGHT_VARS = {};
    ROOT_VARS = {};
    FILE_CSS = [];
    UNIQUE_CLASS_SELECTORS.clear()

    FINAL_LIGHT_VARS = {};
    FINAL_NIGHT_VARS = {};
    FINAL_ROOT_VARS = {};
    FINAL_FILE_CSS = [];
    FINAL_UNIQUE_CLASS_SELECTORS.clear()
}

async function processDirectory(dirPath: string, allFiles = new Map<string, Map<string, ProcessedFile>>()) {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    // Process all subdirectories first
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            await processDirectory(fullPath, allFiles);
        }
    }

    // Then process files in current directory
    const filesInDir = new Map<string, ProcessedFile>();
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (!entry.isDirectory() && entry.name.endsWith(".tsx")) {
            const content = await fs.promises.readFile(fullPath, "utf-8");
            const hasExports = EXPORT_REGEX.test(content);

            let hasStyles = false;
            let match;

            while ((match = CSS_COMMENT_STRING_REGEX.exec(content)) !== null) {
                const input = match[1].trim();
                hasStyles = true;
                ProcessCSS(input);
            }

            while ((match = FUNCTION_DOC_REGEX.exec(content)) !== null) {
                const doc = match[1].trim().replace(/^\/\//, '');
                const data = match[3].trim(); // Extract the function part

                const functionNameMatch = data.match(/function\s+(\w+)\s*\(/);
                const functionName = functionNameMatch ? functionNameMatch[1] : null;

                const element = SafeString(fullPath) + "." + functionName;

                FUNCTION_DOCS.push({ element, doc, data });
            }

            if (hasStyles || hasExports) {
                filesInDir.set(fullPath, {
                    path: fullPath,
                    hasStyles,
                    hasExports
                });
            }
        }
    }

    // Write files for current directory
    if (filesInDir.size > 0) {
        // Add to global processed files
        for (const [path, file] of filesInDir) {
            PROCESSED_FILES.set(path, file);
        }

        await writeCssTs(dirPath);
    }

    return allFiles;
}

async function writeCssTs(folderPath: string) {

    const folderName = path.basename(folderPath);

    if (ROOT_VARS || LIGHT_VARS || NIGHT_VARS || FILE_CSS) {
        const buildVars = (theme: string, vars: Record<string, string>) => `${theme == "root" ? ":root" : ("." + theme)} {\n` +
            Object.entries(vars)
                .map(([k, v]) => (v != "" && v != ";")
                    ? `    ${k}: ${v}${v.endsWith(";") ? "" : ";"}`
                    : `    ${k}: ;`)
                .join("\n") +
            "\n}";

        let combinedCSS = [
            buildVars("root", ROOT_VARS), "",
            buildVars("light", LIGHT_VARS), "",
            buildVars("night", NIGHT_VARS), "",
            ...FILE_CSS
        ].join("\n");

        if (combinedCSS) {

            // Generate exports string
            const exportFiles = Array.from(PROCESSED_FILES.values())
                .filter(file => file.hasExports)
                .map(file => `export * from "${file.path.replace(folderPath, ".")}"; ${FUNCTION_DOCS.length > 0 ? `import * as ${SafeString(file.path)} from "${file.path.replace(folderPath, ".")}";` : ""}`)
                .join("\n");

            // Generate styles string
            const styleFiles = Array.from(PROCESSED_FILES.values())
                .filter(file => file.hasStyles)
                .map(file => file.path.replace(folderName + "/", ""))
                .join("\n");

            console.log(folderPath)
            if (folderPath == "src" || folderPath == "test") {
                console.log(`Extracted CSS to ${folderPath}/gen.css`);
                await fs.promises.writeFile(`${folderPath}/gen.css`,
                    `/*\n${styleFiles}\n*/\n\n` +
                    combinedCSS.trim() + "\n",
                    "utf-8");
            }

            await WriteTsFile(`${folderPath}/gen.ts`, exportFiles.trim());

            FINAL_ROOT_VARS = {
                ...FINAL_ROOT_VARS,
                ...ROOT_VARS,
            };
            FINAL_LIGHT_VARS = {
                ...FINAL_LIGHT_VARS,
                ...LIGHT_VARS,
            };
            FINAL_NIGHT_VARS = {
                ...FINAL_NIGHT_VARS,
                ...NIGHT_VARS,
            };
            FINAL_FILE_CSS = [
                ...FINAL_FILE_CSS,
                ...FILE_CSS,
            ];

            ROOT_VARS = {};
            LIGHT_VARS = {};
            NIGHT_VARS = {};
            FILE_CSS = [];
            PROCESSED_FILES.clear();
            FUNCTION_DOCS = []
        }
    }
}

async function WriteTsFile(filePath, exportFiles: string) {

    const cssVarMappings = Object.keys({ ...LIGHT_VARS, ...ROOT_VARS })
        .filter(key => key.startsWith('--'))
        .map(key => ({
            name: cssVarToVarName(key),
            value: key
        }));

    // Get subfolder exports
    const dirName = path.dirname(filePath)
    const entries = await fs.promises.readdir(dirName, { withFileTypes: true });
    const subFolderExports = await Promise.all(
        entries
            .filter(entry => entry.isDirectory())
            .map(async folder => {
                const subGenPath = path.join(dirName, folder.name, "gen.ts");
                try {
                    await fs.promises.access(subGenPath);
                    return {
                        export: `export * from "./${folder.name}/gen";`,
                    };
                } catch {
                    return null;
                }
            })
    );

    const classSelectors = Array.from(UNIQUE_CLASS_SELECTORS)
        .filter(s => s.trim())
        .map(selector => {

            // Get the first class selector
            const match = selector.match(/\.([\w-]+)/);

            if (!match) return null;

            // Extract the base class name
            const value = match[1];

            // Generate the Pascal case key
            const key = value
                .replace(/-(.)/g, (_, chr) => chr.toUpperCase())
                .replace(/^[a-z]/, c => c.toUpperCase());

            return { key, value };
        })
        .filter((item): item is { key: string, value: string } =>
            item !== null && item.key !== '' && item.value !== '')
        .filter((item, index, self) =>
            index === self.findIndex(t => t.value === item.value));

    const fileName = filePath.split("/").at(-2).toUpperCase()

    const content = `${filePath != "src/gen.ts" && filePath != "test/gen.ts" ? "import '../gen.css'" : ""}
${filePath.startsWith('test') ? `import "./gen.css"` : ""}
${exportFiles}
${subFolderExports.filter(Boolean).map(exp => exp?.export).join("\n")}

export const Css${fileName} = {
    ${classSelectors.toString().trim()
            ? classSelectors.map(({ key, value }) => `${key}: "${value}"`).join(',\n    ') + ','
            : ""}

    ${cssVarMappings.map(({ name, value }) => `${name}: "${value}"`).join(',\n    ')}

    ${FUNCTION_DOCS.length > 0 ? `,Docs: [${FUNCTION_DOCS.sort((a, b) => {
                const comparison = a.doc.charCodeAt(0) - b.doc.charCodeAt(0);
                return comparison !== 0 ? a.doc.localeCompare(b.doc) : comparison
            }).map((f) => {
                return `
        {
            element: ${f.element}, 
            doc: "${f.doc.replace(/^\d+\.\s*/, '')}", 
            data: ${JSON.stringify(f.data).replaceAll("    ", "  ")}
        }`
            })}
    ]` : ""}
} as const;

export type Css${fileName}Type = keyof typeof Css${fileName};
`;

    await fs.promises.writeFile(filePath, content, 'utf-8');

    console.log(`Generated selectors file: ${filePath}`);

    FINAL_UNIQUE_CLASS_SELECTORS = new Set([
        ...FINAL_UNIQUE_CLASS_SELECTORS,
        ...UNIQUE_CLASS_SELECTORS,
    ]);

    UNIQUE_CLASS_SELECTORS.clear();
}

function cssVarToVarName(cssVar: string): string {
    // Remove leading '--' and convert to camelCase
    return 'var' + cssVar
        .replace(/^--/, '')
        .split('-')
        .map((part) =>
            part.charAt(0).toUpperCase() + part.slice(1)
        )
        .join('');
}
