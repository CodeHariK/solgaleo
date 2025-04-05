// vite-plugin-extract-css-comments.ts
import fs from "fs";
import path from "path";
import { Plugin } from "vite";

const CSS_COMMENT_REGEX = /\/\*\s*CSS:\s*([\s\S]*?)\*\//gm;

const propMap: Record<string, string> = {
    background: "bg",
    color: "col",
    position: "pos",
};

type Node = {
    selector: string;
    properties: string[];
    children: Node[];
};

let LightVars: Record<string, string> = {};
let NightVars: Record<string, string> = {};
let FinalCSS: string[] = [];

function buildSelectorPath(path: string[]): string {
    return path.filter(Boolean).join(" ").replace(/\s+/g, " ");
}

function flattenSelector(path: string[]): string {
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
        LightVars[m] = "";
        NightVars[m] = "";
    });
}

function ExtractVarValue(value: string, key: string) {
    if (value.replaceAll(" ", "").startsWith("var:")) {

        const parts = value.split(":").map(p => p.trim());
        if (parts.length === 2) {
            LightVars[key] = parts[1];
            NightVars[key] = parts[1];
        } else if (parts.length === 3) {
            LightVars[key] = parts[1];
            NightVars[key] = parts[2];
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
        if (value) {
            lines.push(`    ${prop}: ${value}${value.endsWith(";") ? "" : ";"}`);
        }
    }
}


function processNode(node: Node, path: string[] = []) {
    const fullSelector = buildSelectorPath([...path, node.selector]);
    const lines: string[] = [];

    for (const propLine of node.properties) {
        if (!propLine.includes(":")) continue;
        const [rawProp, ...rest] = propLine.split(":");
        const prop = rawProp.trim();
        const value = rest.join(":").trim();
        const short = propMap[prop] ?? prop;
        const last = (node.selector.includes(":")) ? node.selector.split(":").at(-1) : "";
        const cleanPath = flattenSelector([...path, node.selector]);
        const key = `--${cleanPath}-${short}${last ? `-${last}` : ""}`.replace(/--+/g, "--");

        if (prop.startsWith("--")) {
            if (!ExtractVarValue(value, prop)) {
                LightVars[prop] = value;
                NightVars[prop] = value;
            }
            continue
        }

        ExtractKV(value, prop, key, lines);
    }

    if (lines.length) {
        FinalCSS.push(`${fullSelector} {\n${lines.join("\n")}\n}`);
    }

    for (const child of node.children) {
        processNode(child, [...path, node.selector]);
    }
}

function convertCSS(input: string) {

    const lines = input.split("\n");
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

        if (trimLine(line).startsWith("@keyframes")) {
            const header = trimLine(line); // e.g., "@keyframes marquee"
            const name = header.split(" ")[1]?.trim();
            const buffer: string[] = [header];
            i++;

            let depth = 0;
            let currentStep = "0";

            while (i < lines.length) {
                let l = lines[i];
                const trimmed = trimLine(l);

                ExtractInlineVars(l);

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

                    const key = `--keyframes-${name}-${currentStep}-${propMap[prop] ?? prop}`;
                    if (ExtractVarValue(value, key)) {
                        l = `        ${prop}: var(${key});`;
                    }
                }

                buffer.push(l);
                i++;

                if (depth < 0) break;
            }


            FinalCSS.push(buffer.join("\n"));
            continue;
        }

        const trimmed = trimLine(line);
        if (!trimmed) {
            i++;
            continue;
        }

        if (trimmed.endsWith("{")) {
            const sel = trimmed.slice(0, -1).trim();
            const node: Node = { selector: sel, properties: [], children: [] };
            current.children.push(node);
            stack.push(current);
            current = node;
        } else if (trimmed === "}") {
            current = stack.pop()!;
        } else {
            current.properties.push(trimmed);
        }

        i++;
    }

    processNode(root);
}

export default function ExtractCssComments(dir: string): Plugin {
    let lastFolderPath = "", lastFolderName = ""
    let processed: string[] = [];
    async function runExtract() {
        const walk = async (dirPath: string) => {
            const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);

                const folderPath = path.dirname(fullPath);
                const folderName = path.basename(folderPath);
                if (folderPath !== lastFolderPath) {
                    lastFolderPath = folderPath;
                }
                lastFolderPath = folderPath;
                lastFolderName = folderName;

                if (entry.isDirectory()) {
                    await walk(fullPath);
                } else if (entry.name.endsWith(".tsx")) {

                    const content = await fs.promises.readFile(fullPath, "utf-8");
                    let match;

                    while ((match = CSS_COMMENT_REGEX.exec(content)) !== null) {
                        const input = match[1].trim();
                        processed.push(fullPath);
                        convertCSS(input);
                    }
                }
            }
            if (LightVars || NightVars || FinalCSS) {
                const buildVars = (theme: string, vars: Record<string, string>) =>
                    `.${theme} {\n` +
                    Object.entries(vars)
                        .map(([k, v]) => v ? `    ${k}: ${v}${v.endsWith(";") ? "" : ";"}` : `    /* ${k}: ; */`)
                        .join("\n") +
                    "\n}";

                let combinedCSS = [buildVars("light", LightVars), "", buildVars("night", NightVars), "", ...FinalCSS].join("\n");

                if (combinedCSS) {
                    const cssFilePath = path.join(lastFolderPath, `${lastFolderName}.gen.css`);
                    await fs.promises.writeFile(cssFilePath,
                        `/*\n${processed.join("\n")}\n*/\n\n` +
                        combinedCSS.trim(),
                        "utf-8");

                    console.log(`Extracted CSS to ${cssFilePath}`);

                    LightVars = {};
                    NightVars = {};
                    processed = [];
                    FinalCSS.length = 0;
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