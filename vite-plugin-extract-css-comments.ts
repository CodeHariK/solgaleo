// vite-plugin-extract-css-comments.ts
import fs from "fs";
import path from "path";
import { Plugin } from "vite";

const CSS_COMMENT_REGEX = /\/\*\s*CSS:\s*([\s\S]*?)\*\//gm;

function convertCSS(input: string): string {

    const propMap: Record<string, string> = {
        background: "bg",
        color: "col",
        position: "pos",
    };

    const lightVars: Record<string, string> = {};
    const nightVars: Record<string, string> = {};
    const cssLines: Record<string, string[]> = {};
    const finalCSS: string[] = [];

    const lines = input.trim().split("\n");

    let currentSelector = "";
    let inBlock = false;
    const blockLines: string[] = [];

    function processBlock(selector: string, block: string[]) {

        const lastSelector = selector.includes(":") ? selector.split(":").at(-1)! : "" // hover, focus

        const selKey = selector.replace(/[:.#]/g, "")
            .replace(/[^a-zA-Z0-9]/g, "_")
            .replace(lastSelector, "")

        if (!cssLines[selector]) cssLines[selector] = [];

        for (let rawLine of block) {
            if (!rawLine.includes(":")) continue;

            const [propRaw, ...valueParts] = rawLine.split(":");
            const prop = propRaw.trim()
            const propTrim = propMap[prop] ?? prop;
            const value = valueParts.join(":").trim();

            if (rawLine.trim().replaceAll(" ", "").startsWith("//")) {
                continue
            }

            const matches = [...value.matchAll(/var\((--[\w-]+)\)/g)].map(m => m[1]);
            matches.forEach((m) => {
                lightVars[m] = (lightVars[m] ?? "");
                nightVars[m] = (nightVars[m] ?? "");
            })

            if (!value.trim().replaceAll(" ", "").startsWith("var:")) {
                if (value != "") {
                    cssLines[selector].push(`  ${prop}: ${value}${value.endsWith(";") ? "" : ";"}`);
                    continue;
                }
            }

            const parts = value.split(":").map((s) => s.trim());

            const varName = prop.startsWith("--") ? prop : `--${selKey}-${propTrim}${lastSelector ? "-" + lastSelector : ""}`;

            // One value = same for both themes
            if (parts.length === 2) {
                lightVars[varName] = (lightVars[varName] ?? "") + parts[1];
                nightVars[varName] = (nightVars[varName] ?? "") + parts[1];
            } else if (parts.length === 3) {
                lightVars[varName] = (lightVars[varName] ?? "") + parts[1];
                nightVars[varName] = (nightVars[varName] ?? "") + parts[2];
            }

            if (!prop.startsWith("--")) {
                cssLines[selector].push(`  ${prop}: var(${varName});`);
            }
        }
    }

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        if (line.endsWith("{")) {
            currentSelector = line.slice(0, -1).trim();
            inBlock = true;
            blockLines.length = 0;
            continue;
        }

        if (line === "}") {
            inBlock = false;
            processBlock(currentSelector, blockLines);
            continue;
        }

        if (inBlock) {
            blockLines.push(line);
        }
    }

    if (inBlock && blockLines.length > 0) {
        processBlock(currentSelector, blockLines);
    }

    for (const [selector, value] of Object.entries(cssLines)) {
        if (value.join("")) {
            finalCSS.push(`${selector} {\n${value.join("\n")}\n}`);
        }
    }

    const buildVars = (theme: string, vars: Record<string, string>) =>
        `.${theme} {\n` +
        Object.entries(vars)
            .filter(([k]) => {
                return !Object.entries(cssLines).find((e) => {
                    return e[1].find((x) => {
                        return x.trim().startsWith(k)
                    })
                })
            })
            .map(([k, v]) => v.length ? `  ${k}: ${v};` : `  /* ${k}: ${v}; */`)
            .join("\n") +
        "\n}";

    return [
        buildVars("light", lightVars),
        "",
        buildVars("night", nightVars),
        "",
        ...finalCSS,
    ].join("\n");
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