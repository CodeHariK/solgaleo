// vite-plugin-extract-css-comments.ts
import fs from "fs";
import path from "path";
import { Plugin } from "vite";

const CSS_COMMENT_REGEX = /\/\*\s*CSS:\s*([\s\S]*?)\*\//gm;

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

let LIGHT_VARS: Record<string, string> = {};
let NIGHT_VARS: Record<string, string> = {};
let FINAL_CSS: string[] = [];
let UNIQUE_SELECTORS: Set<string> = new Set();

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

function ProcessNode(node: Node, path: string[] = []) {
    let fullSelector = BuildSelectorPath([...path, node.selector]);
    const classSelector = BuildClassSelector([...path, node.selector]);

    // If selector contains multiple parts (comma-separated)
    if (node.selector.includes(',')) {
        // Split the selector and create a compound selector
        const selectors = node.selector.split(',').map(s => s.trim());
        const baseSelector = path.join("").trim();
        node.selector = selectors
            .map(s => `${baseSelector}${s}`)
            .join(', ');

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
        UNIQUE_SELECTORS.add(classSelector.trim());
        FINAL_CSS.push(`${fullSelector} {\n${lines.join("\n")}\n}\n`);
    }

    for (const child of node.children) {
        ProcessNode(child, [...path, node.selector]);
    }
}

function ConvertCSS(input: string) {

    const lines = input.split(/(?<=[;{}])\s*\n/)

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

        if (trimLine(line).startsWith("@keyframes") || trimLine(line).startsWith("@media")) {
            const header = trimLine(line); // e.g., "@keyframes marquee"
            const name = header.split(" ")[1]?.trim();
            const buffer: string[] = [header];
            i++;

            let depth = 0;
            let currentStep = "0";

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


            FINAL_CSS.push(buffer.join("\n") + "\n");
            continue;
        }

        const trimmed = trimLine(line);
        if (!trimmed) {
            i++;
            continue;
        }

        if (trimmed.includes("{") && trimmed.indexOf("{") < trimmed.lastIndexOf("}")) {

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

    ProcessNode(root);
}

export default function ExtractCssComments(dir: string): Plugin {
    let folderPath = "", folderName = ""
    let processedFile: string[] = [];

    async function runExtract() {
        const walk = async (dirPath: string) => {
            const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);

                folderPath = path.dirname(fullPath);
                folderName = path.basename(folderPath);

                if (entry.isDirectory()) {
                    await walk(fullPath);
                } else if (entry.name.endsWith(".tsx")) {

                    const content = await fs.promises.readFile(fullPath, "utf-8");
                    let match;

                    while ((match = CSS_COMMENT_REGEX.exec(content)) !== null) {
                        const input = match[1].trim();
                        processedFile.push(fullPath);
                        ConvertCSS(input);
                    }
                }
            }

            if (LIGHT_VARS || NIGHT_VARS || FINAL_CSS) {
                const buildVars = (theme: string, vars: Record<string, string>) =>
                    `.${theme} {\n` +
                    Object.entries(vars)
                        .map(([k, v]) =>
                            (v != "" && v != ";")
                                ? `    ${k}: ${v}${v.endsWith(";") ? "" : ";"}`
                                : `    /* ${k}: ; */`)
                        .join("\n") +
                    "\n}";

                let combinedCSS = [
                    buildVars("light", LIGHT_VARS), "",
                    buildVars("night", NIGHT_VARS), "",
                    ...FINAL_CSS
                ].join("\n");

                if (combinedCSS) {
                    const cssFilePath = path.join(folderPath, `${folderName}.gen.css`);
                    await fs.promises.writeFile(cssFilePath,
                        `/*\n${processedFile.join("\n")}\n*/\n\n` +
                        combinedCSS.trim() + "\n",
                        "utf-8");

                    console.log(`Extracted CSS to ${cssFilePath}`);

                    await WriteSelectorsFile(cssFilePath);

                    LIGHT_VARS = {};
                    NIGHT_VARS = {};
                    processedFile = [];
                    FINAL_CSS.length = 0;
                }
            }
        };

        await walk(dir);
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
}

async function WriteSelectorsFile(cssFilePath: string) {
    const selectors = Array.from(UNIQUE_SELECTORS)
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

    const content = `// Auto-generated CSS selectors
export const SolCSS = {
    ${selectors.map(({ key, value }) => `${key}: "${value}"`).join(',\n    ')}
} as const;

export type SolCSSType = keyof typeof SolCSS;
`;

    const tsFilePath = cssFilePath + '.ts';
    await fs.promises.writeFile(tsFilePath, content, 'utf-8');

    console.log(`Generated selectors file: ${tsFilePath}`);

    UNIQUE_SELECTORS.clear();
}
