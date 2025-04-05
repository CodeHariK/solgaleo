// vite-plugin-extract-css-comments.ts
import fs from "fs";
import path from "path";
import { Plugin } from "vite";

const CSS_COMMENT_REGEX = /\/\*\s*CSS:\s*([\s\S]*?)\*\//gm;

// function convertCSS(input: string): string {
//     const lightVars: Record<string, string> = {};
//     const nightVars: Record<string, string> = {};
//     const finalCSS: string[] = [];

//     const propMap: Record<string, string> = {
//         background: "bg",
//         color: "col",
//         position: "pos",
//     };

//     type Node = {
//         selector: string;
//         properties: string[];
//         children: Node[];
//     };

//     const lines = input.split("\n");
//     const stack: Node[] = [];
//     const root: Node = { selector: "", properties: [], children: [] };
//     let current = root;

//     const trimLine = (l: string) => l.trim();

//     // First handle @keyframes blocks separately and preserve structure
//     let i = 0;
//     while (i < lines.length) {
//         const line = lines[i];
//         if (trimLine(line).startsWith("@keyframes")) {
//             const buffer: string[] = [line];
//             i++;
//             let depth = 0;
//             while (i < lines.length) {
//                 const l = lines[i];
//                 if (l.includes("{")) depth++;
//                 if (l.includes("}")) depth--;
//                 buffer.push(l);
//                 i++;
//                 if (depth < 0) break;
//             }
//             finalCSS.push(buffer.join("\n"));
//             continue;
//         }

//         const trimmed = trimLine(line);
//         if (!trimmed) {
//             i++;
//             continue;
//         }

//         if (trimmed.endsWith("{")) {
//             const sel = trimmed.slice(0, -1).trim();
//             const node: Node = { selector: sel, properties: [], children: [] };
//             current.children.push(node);
//             stack.push(current);
//             current = node;
//         } else if (trimmed === "}") {
//             current = stack.pop()!;
//         } else {
//             current.properties.push(trimmed);
//         }

//         i++;
//     }

//     function buildSelectorPath(path: string[]): string {
//         return path.filter(Boolean).join(" ").replace(/\s+/g, " ");
//     }

//     function processNode(node: Node, path: string[] = []) {
//         const fullSelector = buildSelectorPath([...path, node.selector]);
//         const lines: string[] = [];

//         for (const propLine of node.properties) {
//             if (!propLine.includes(":") || propLine.trim().startsWith("//")) continue;
//             const [rawProp, ...rest] = propLine.split(":");
//             const prop = rawProp.trim();
//             const value = rest.join(":").trim();
//             const short = propMap[prop] ?? prop;
//             const key = `--${[...path, node.selector].filter(Boolean).join("-").replace(/[^\w-]/g, "_")}-${short}`;

//             if (value.startsWith("var:")) {
//                 const parts = value.split(":").map(p => p.trim());
//                 if (parts.length === 2) {
//                     lightVars[key] = parts[1];
//                     nightVars[key] = parts[1];
//                 } else if (parts.length === 3) {
//                     lightVars[key] = parts[1];
//                     nightVars[key] = parts[2];
//                 }
//                 lines.push(`  ${prop}: var(${key});`);
//             } else {
//                 lines.push(`  ${prop}: ${value};`);
//             }
//         }

//         if (lines.length) {
//             finalCSS.push(`${fullSelector} {\n${lines.join("\n")}\n}`);
//         }

//         for (const child of node.children) {
//             processNode(child, [...path, node.selector]);
//         }
//     }

//     processNode(root);

//     const buildVars = (theme: string, vars: Record<string, string>) =>
//         `.${theme} {\n` +
//         Object.entries(vars)
//             .map(([k, v]) => v ? `  ${k}: ${v};` : `  /* ${k}: ; */`)
//             .join("\n") +
//         "\n}";

//     return [buildVars("light", lightVars), "", buildVars("night", nightVars), "", ...finalCSS].join("\n");
// }

function convertCSS(input: string): string {
    const lightVars: Record<string, string> = {};
    const nightVars: Record<string, string> = {};
    const finalCSS: string[] = [];

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

    const lines = input.split("\n");
    const stack: Node[] = [];
    const root: Node = { selector: "", properties: [], children: [] };
    let current = root;

    const trimLine = (l: string) => l.trim();

    // First handle @keyframes blocks separately and preserve structure
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (trimLine(line).startsWith("@keyframes")) {
            const buffer: string[] = [line];
            i++;
            let depth = 0;
            while (i < lines.length) {
                const l = lines[i];
                if (l.includes("{")) depth++;
                if (l.includes("}")) depth--;
                buffer.push(l);
                i++;
                if (depth < 0) break;
            }
            finalCSS.push(buffer.join("\n"));
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

            if (value.startsWith("var:")) {
                const parts = value.split(":").map(p => p.trim());
                if (parts.length === 2) {
                    lightVars[key] = parts[1];
                    nightVars[key] = parts[1];
                } else if (parts.length === 3) {
                    lightVars[key] = parts[1];
                    nightVars[key] = parts[2];
                }
                lines.push(`  ${prop}: var(${key});`);
            } else {
                if (value) {
                    lines.push(`  ${prop}: ${value}${value.endsWith(";") ? "" : ";"}`);
                }
            }
        }

        if (lines.length) {
            finalCSS.push(`${fullSelector} {\n${lines.join("\n")}\n}`);
        }

        for (const child of node.children) {
            processNode(child, [...path, node.selector]);
        }
    }

    processNode(root);

    const buildVars = (theme: string, vars: Record<string, string>) =>
        `.${theme} {\n` +
        Object.entries(vars)
            .map(([k, v]) => v ? `  ${k}: ${v};` : `  /* ${k}: ; */`)
            .join("\n") +
        "\n}";

    return [buildVars("light", lightVars), "", buildVars("night", nightVars), "", ...finalCSS].join("\n");
}

export default function ExtractCssComments(dir: string): Plugin {
    async function runExtract() {
        const walk = async (dirPath: string) => {
            const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    await walk(fullPath);
                } else if (entry.name.endsWith(".tsx")) {
                    const content = await fs.promises.readFile(fullPath, "utf-8");
                    let match;
                    let combinedCSS = "";

                    while ((match = CSS_COMMENT_REGEX.exec(content)) !== null) {
                        const input = match[1].trim();
                        const output = convertCSS(input);
                        combinedCSS += output + "\n\n";
                    }

                    if (combinedCSS) {
                        const folderPath = path.dirname(fullPath);
                        const folderName = path.basename(folderPath);
                        const cssFilePath = path.join(folderPath, `${folderName}.gen.css`);
                        await fs.promises.writeFile(cssFilePath, combinedCSS.trim(), "utf-8");
                        console.log(`✅ Extracted CSS to ${cssFilePath}`);
                    }
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
            runExtract(); // Run once on server start

            server.watcher.on('change', async (changedPath) => {
                if (changedPath.endsWith('.tsx')) {
                    await runExtract();
                }
            });
        },
    };
}