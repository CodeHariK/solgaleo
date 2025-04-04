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
    const finalCSS: string[] = [];

    const lines = input.trim().split("\n");

    let currentSelector = "";
    let inBlock = false;
    const blockLines: string[] = [];

    function processBlock(selector: string, block: string[]) {
        const hover = selector.includes(":hover");
        const selKey = selector.replace(/[:.]/g, "").replace("hover", "");
        const cssLines: string[] = [];

        for (let rawLine of block) {
            if (!rawLine.includes(":")) continue;

            const [propRaw, ...valueParts] = rawLine.split(":");
            const prop = propRaw.trim()
            const propTrim = propMap[prop] ?? prop;
            const value = valueParts.join(":").trim();

            if (!value.startsWith("var:")) {
                cssLines.push(`  ${prop}: ${value};`);
                continue;
            }

            const parts = value.slice(4).split(":").map((s) => s.trim());
            const varName = `--${selKey}-${propTrim}${hover ? "-hover" : ""}`;

            // One value = same for both themes
            if (parts.length === 1) {
                lightVars[varName] = parts[0];
                nightVars[varName] = parts[0];
            } else if (parts.length >= 2) {
                lightVars[varName] = parts[0];
                nightVars[varName] = parts[1];
            }

            cssLines.push(`  ${prop}: var(${varName});`);
        }

        finalCSS.push(`${selector} {\n${cssLines.join("\n")}\n}`);
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

    const buildVars = (theme: string, vars: Record<string, string>) =>
        `.${theme} {\n` +
        Object.entries(vars)
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
    return {
        name: "vite-plugin-extract-css-comments",
        apply: "build",
        async buildStart() {
            const walk = async (dir: string) => {
                const entries = await fs.promises.readdir(dir, { withFileTypes: true });
                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);
                    if (entry.isDirectory()) {
                        await walk(fullPath);
                    } else if (entry.name.endsWith(".tsx")) {
                        const content = await fs.promises.readFile(fullPath, "utf-8");
                        let match;
                        let combinedCSS = "";
                        while ((match = CSS_COMMENT_REGEX.exec(content)) !== null) {
                            let input = match[1].trim()
                            let output = convertCSS(input)

                            // console.log("****************" + fullPath)
                            // console.log(input)
                            // console.log("----")
                            // console.log(output)
                            // console.log("***************")

                            combinedCSS += output + "\n\n";
                        }

                        if (combinedCSS) {
                            const folderPath = path.dirname(fullPath);
                            const folderName = path.basename(folderPath);
                            const cssFilePath = path.join(folderPath, `${folderName}.css`);
                            await fs.promises.writeFile(cssFilePath, combinedCSS.trim(), "utf-8");
                            console.log(`✅ Extracted CSS to ${cssFilePath}`);
                        }
                    }
                }
            };

            await walk(dir);
        },
    };
}
