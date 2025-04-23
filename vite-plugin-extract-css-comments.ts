// vite-plugin-extract-css-comments.ts
import fs from "fs";
import path from "path";
import { Plugin } from "vite";
import { SafeString } from "./src/utils/regex";

const CSS_COMMENT_REGEX = /\/\*\s*CSS:\-\s*([\s\S]*?)\*\//gm;
const CSS_COMMENT_STRING_REGEX = /\/\*\s*CSS:\*\s*([\s\S]*?)\*\//gm;
const CSS_COMMENT_COPY_REGEX = /\/\*\s*CSS:\+\s*([\s\S]*?)\*\//gm;

const FUNCTION_DOC_REGEX = /\/\/FN:START\s*([\s\S]*?)\/\/FN:(DOC|END)\s*([\s\S]*?)\/\/FN:END/g;

const EXPORT_REGEX = /export\s+(?:const|let|var|function|class|type|interface|enum)/;

const PROP_MAP: Record<string, string> = {
    background: "bg",
    color: "col",
    position: "pos",
};

type Node = {
    selector: string;
    properties: string[];
    children: Node[];
};

let FINAL_LIGHT_VARS: Record<string, string> = {};
let FINAL_NIGHT_VARS: Record<string, string> = {};
let FINAL_FILE_CSS: string[] = [];
let FINAL_UNIQUE_CLASS_SELECTORS: Set<string> = new Set();

let LIGHT_VARS: Record<string, string> = {};
let NIGHT_VARS: Record<string, string> = {};
let FILE_CSS: string[] = [];
let UNIQUE_CLASS_SELECTORS: Set<string> = new Set();

let FUNCTION_DOCS: { element: string, doc: string, data: string }[] = [];

function FlattenSelector(path: string[]): string {
    if (path.length === 0) return "";

    const last = path.at(-1);
    if (last && last.includes(":")) {
        path[path.length - 1] = last.split(":")[0];
    }

    return path
        .map((part) =>
            part
                .replace(/[:.#]/g, "")
                .replace(/[^a-zA-Z0-9]/g, "-")
        )
        .join("-");
}

function ExtractInlineVars(line: string) {
    const matches = [...line.matchAll(/var\((--[\w-]+)\)/g)].map(m => m[1]);
    matches.forEach((m) => {
        LIGHT_VARS[m] = "";
        NIGHT_VARS[m] = "";
    });
}

function ExtractVarValue(value: string, key: string) {
    if (value.replaceAll(" ", "").startsWith("var:")) {

        const parts = value.split(":").map(p => p.trim());
        if (parts.length === 2) {
            LIGHT_VARS[key] = parts[1];
            NIGHT_VARS[key] = parts[1];
        } else if (parts.length === 3) {
            LIGHT_VARS[key] = parts[1];
            NIGHT_VARS[key] = parts[2];
        }
        return true
    }
    return false
}

function ExtractKV(value: string, prop: string, key: string, lines: string[]) {
    const varName = prop.startsWith("--") ? prop : key;
    if (ExtractVarValue(value, varName)) {
        lines.push(`    ${prop}: var(${varName});`);
    } else {
        if (value != "" && value != ";") {
            lines.push(`    ${prop}: ${value}${value.endsWith(";") ? "" : ";"}`);
        }
    }
}

function BuildClassSelector(path: string[]): string {
    return path.filter(Boolean).join(" ").replace(/\s+/g, " ")
}

function BuildSelectorPath(path: string[]): string {
    return path
        .filter(Boolean)
        .map((part, i, arr) => {
            const nextPart = arr[i + 1] || '';
            // Remove spaces around combinators (>, +, ~)
            const isCombinator = part === '>' || part === '+' || part === '~';
            const nextIsCombinator = nextPart === '>' || nextPart === '+' || nextPart === '~';

            if (isCombinator || nextIsCombinator) {
                return part;
            }

            // Don't add space if next selector starts with special characters
            const needsSpace = !(nextPart.startsWith(':') ||
                nextPart.startsWith('.') ||
                nextPart.startsWith('['));
            return part + (needsSpace ? ' ' : '');
        })
        .join('')
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\s*([-+>~])\s*/g, '$1'); // Remove spaces around combinators
}

function ProcessNode(node: Node, path: string[], fullCopy: boolean) {
    let fullSelector = BuildSelectorPath([...path, node.selector]);
    const classSelector = BuildClassSelector([...path, node.selector]);

    // If selector contains multiple parts (comma-separated)
    if (node.selector.includes(',')) {
        // Split the selector and create a compound selector
        const selectors = node.selector.split(',').map(s => s.trim());
        const baseSelector = path.join("").trim();
        node.selector = selectors
            .map(s => `${baseSelector}${s}`)
            .join(',\n');

        fullSelector = node.selector;
    }

    const lines: string[] = [];

    for (const propLine of node.properties) {
        if (!propLine.includes(":")) continue;
        const [rawProp, ...rest] = propLine.split(":");
        const prop = rawProp.trim();
        const value = rest.join(":").trim();
        const short = PROP_MAP[prop] ?? prop;
        const last = (node.selector.includes(":")) ? node.selector.split(":").at(-1) : "";
        const cleanPath = FlattenSelector([...path, node.selector]);
        const key = `--${cleanPath}-${short}${last ? `-${last}` : ""}`.replace(/--+/g, "--");

        if (prop.startsWith("--")) {
            if (!ExtractVarValue(value, prop)) {
                LIGHT_VARS[prop] = value;
                NIGHT_VARS[prop] = value;
            }
            continue
        }

        ExtractKV(value, prop, key, lines);
    }

    if (lines.length) {
        UNIQUE_CLASS_SELECTORS.add(classSelector.trim());
        if (!fullCopy) {
            FILE_CSS.push(`${fullSelector} {\n${lines.join("\n")}\n}\n`);
        }
    }

    for (const child of node.children) {
        ProcessNode(child, [...path, node.selector], fullCopy);
    }
}

function ConvertCSS(input: string, fullCopy: boolean) {

    let MEDIA_KEYFRAME_CSS: string[] = [];

    const lines = input.split(/(?<=[;{}]|\/\/.*)\s*\n/)

    const stack: Node[] = [];
    const root: Node = { selector: "", properties: [], children: [] };
    let current = root;

    const trimLine = (l: string) => l.trim();

    // First handle @keyframes blocks separately and preserve structure
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];

        if (trimLine(line).startsWith("//")) {
            i++;
            continue;
        }

        ExtractInlineVars(line);

        if (!fullCopy) {
            if (trimLine(line).startsWith("@keyframes")
                || trimLine(line).startsWith("@media")) {
                const header = trimLine(line); // e.g., "@keyframes marquee"
                const name = header.split(" ")[1]?.trim();
                const buffer: string[] = [header];
                i++;

                let depth = 0;
                let currentStep = "0";

                if (!(header.includes("{") &&
                    header.indexOf("{") < header.lastIndexOf("}"))) {
                    while (i < lines.length) {
                        let keyframeLine = lines[i];
                        const trimmed = trimLine(keyframeLine);

                        ExtractInlineVars(keyframeLine);

                        // Update current keyframe step if matched
                        const stepMatch = trimmed.match(/^(\d+)%\s*{?$/);
                        if (stepMatch) {
                            currentStep = stepMatch[1];
                        }

                        if (trimmed.endsWith("{")) depth++;
                        if (trimmed === "}") depth--;

                        if (trimmed.includes(":")) {
                            const [rawProp, ...rest] = trimmed.split(":");
                            const prop = rawProp.trim();
                            const value = rest.join(":").trim().replace(/;$/, "");

                            const key = `--keyframes-${name}-${currentStep}-${PROP_MAP[prop] ?? prop}`;
                            if (ExtractVarValue(value, key)) {
                                keyframeLine = `        ${prop}: var(${key});`;
                            }
                        }

                        buffer.push(keyframeLine);
                        i++;

                        if (depth < 0) break;
                    }
                } else {
                    ExtractInlineVars(header);
                }

                MEDIA_KEYFRAME_CSS.push(buffer.join("\n") + "\n");
                continue;
            }
        }

        const trimmed = trimLine(line);
        if (!trimmed) {
            i++;
            continue;
        }

        if (fullCopy) {
            FILE_CSS.push(line)
        }

        if (trimmed.includes("{") &&
            trimmed.indexOf("{") < trimmed.lastIndexOf("}")) {

            // Handle single line CSS rules
            // e.g., ".class { color: red; }"

            let indexOpen = trimmed.indexOf("{");
            let indexClose = trimmed.indexOf("}");
            let properties = trimmed.substring(indexOpen + 1, indexClose).split(";")
            if (properties[0] != "") {

                const sel = trimmed.substring(0, indexOpen).trim();

                let node = current.children.find(c => c.selector === sel);
                if (!node) {
                    node = { selector: sel, properties: [], children: [] };
                    current.children.push(node);
                }
                node.properties.push(...properties.map(p => p.trim()).filter(p => p != "" && p != ";"));
            }
        } else if (trimmed.endsWith("{")) {
            const sel = trimmed.slice(0, -1).trim();

            let node = current.children.find(c => c.selector === sel);
            if (!node) {
                node = { selector: sel, properties: [], children: [] };
                current.children.push(node);
            }

            stack.push(current);
            current = node;
        } else if (trimmed === "}") {
            current = stack.pop()!;
        } else {
            current.properties.push(trimmed);
        }

        i++;
    }

    ProcessNode(root, [], fullCopy);

    if (!fullCopy) {
        FILE_CSS.push(...MEDIA_KEYFRAME_CSS)
    }
    MEDIA_KEYFRAME_CSS = []
}

type ProcessedFile = {
    path: string;
    hasStyles: boolean;
    hasExports: boolean;
}

export default function ExtractCssComments(dir: string): Plugin {
    let processedFiles = new Map<string, ProcessedFile>();

    async function runExtract() {
        await processDirectory(dir);

        LIGHT_VARS = FINAL_LIGHT_VARS
        NIGHT_VARS = FINAL_NIGHT_VARS
        FILE_CSS = FINAL_FILE_CSS
        UNIQUE_CLASS_SELECTORS = FINAL_UNIQUE_CLASS_SELECTORS

        await writeCssTs('src', true);
    }

    return {
        name: 'vite-plugin-extract-css-comments',

        async buildStart() {
            await runExtract();
        },

        configureServer(server) {
            server.watcher.on('change', async (changedPath) => {
                if (changedPath.endsWith('.tsx')) {
                    await runExtract();
                }
            });
        },
    };

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
                while ((match = CSS_COMMENT_REGEX.exec(content)) !== null) {
                    const input = match[1].trim();
                    hasStyles = true;
                    ConvertCSS(input, false);
                }

                while ((match = CSS_COMMENT_STRING_REGEX.exec(content)) !== null) {
                    const input = match[1].trim();
                    hasStyles = true;
                    ConvertCSS(input, true);
                }

                while ((match = CSS_COMMENT_COPY_REGEX.exec(content)) !== null) {
                    const input = match[1].trim();
                    hasStyles = true;
                    FILE_CSS.push(input)
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
                processedFiles.set(path, file);
            }


            await writeCssTs(dirPath, true);
        }

        return allFiles;
    }

    async function writeCssTs(folderPath: string, writeFile: boolean) {
        const folderName = path.basename(folderPath);

        if (LIGHT_VARS || NIGHT_VARS || FILE_CSS) {
            const buildVars = (theme: string, vars: Record<string, string>) => `.${theme} {\n` +
                Object.entries(vars)
                    .filter(([k, _]) => folderPath == "src" ? true : !(
                        k.startsWith("--body") ||
                        k.startsWith("--primary") ||
                        k.startsWith("--secondary") ||
                        k.startsWith("--surface") ||
                        k.startsWith("--disabled") ||
                        k.startsWith("--modal-") ||
                        k.startsWith("--a-") ||
                        k.startsWith("--animation") ||
                        k.startsWith("--ease") ||
                        k.startsWith("--error")
                    ))
                    .map(([k, v]) => (v != "" && v != ";")
                        ? `    ${k}: ${v}${v.endsWith(";") ? "" : ";"}`
                        : `    ${k}: ;`)
                    .join("\n") +
                "\n}";

            let combinedCSS = [
                buildVars("light", LIGHT_VARS), "",
                buildVars("night", NIGHT_VARS), "",
                ...FILE_CSS
            ].join("\n");

            if (combinedCSS) {

                // Generate exports string
                const exportFiles = Array.from(processedFiles.values())
                    .filter(file => file.hasExports)
                    .map(file => `export * from "${file.path.replace(folderPath, ".")}"; ${FUNCTION_DOCS.length > 0 ? `import * as ${SafeString(file.path)} from "${file.path.replace(folderPath, ".")}";` : ""}`)
                    .join("\n");

                // Generate styles string
                const styleFiles = Array.from(processedFiles.values())
                    .filter(file => file.hasStyles)
                    .map(file => file.path.replace(folderName + "/", ""))
                    .join("\n");

                if (writeFile) {
                    await fs.promises.writeFile(`${folderPath}/gen.css`,
                        `/*\n${styleFiles}\n*/\n\n` +
                        combinedCSS.trim() + "\n",
                        "utf-8");
                }

                console.log(`Extracted CSS to ${folderPath}/gen.css`);

                await WriteSelectorsFile(`${folderPath}/gen.ts`, exportFiles.trim(), writeFile);

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

                LIGHT_VARS = {};
                NIGHT_VARS = {};
                FILE_CSS = [];
                processedFiles.clear();
                FUNCTION_DOCS = []
            }
        }
    }
}

async function WriteSelectorsFile(filePath: string, exportFiles: string, writeFile: boolean) {

    const cssVarMappings = Object.keys(LIGHT_VARS)
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
import "./gen.css"
${exportFiles}
${subFolderExports.filter(Boolean).map(exp => exp?.export).join("\n")}

export const Css${fileName} = {
    ${classSelectors.toString().trim()
            ? classSelectors.map(({ key, value }) => `${key}: "${value}"`).join(',\n    ') + ','
            : ""}

    ${cssVarMappings.map(({ name, value }) => `${name}: "${value}"`).join(',\n    ')},

    ${FUNCTION_DOCS.length > 0 ? `Docs: [${FUNCTION_DOCS.map((f) => {
                return `
        {
            element: ${f.element}, 
            doc: "${f.doc}", 
            data: ${JSON.stringify(f.data).replaceAll("    ", "  ")}
        }`
            })}
    ]` : ""}
} as const;

export type Css${fileName}Type = keyof typeof Css${fileName};
`;

    if (writeFile) {
        await fs.promises.writeFile(filePath, content, 'utf-8');
    }

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
