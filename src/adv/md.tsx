import { Component, JSX } from "solid-js";
import { CssADV } from "./gen";

/*CSS:
.SMarkdown {
    background: var : #ffe0fd : red;
    border-radius: 1rem;
    border: 1px solid black;
}
.SMarkdownCode {
    color : var : white;
    background: var : #232323 : #15ff00;
    
    >div {
        padding: .5rem;
        background: var : #585858 : blue;
        display: flex;
        justify-content: space-between;
    }
}
*/

interface MiniMarkdownProps {
    content: string;
}
export const MiniMarkdown: Component<MiniMarkdownProps> = (props) => {
    const jsxContent = () => parseMarkdownToJSX(props.content);
    return <div class={CssADV.SMarkdown}>{jsxContent()}</div>;
};


function parseMarkdownToJSX(text: string): JSX.Element[] {
    const lines = text.split("\n");
    const result: JSX.Element[] = [];

    let inCodeBlock = false;
    let codeLang = "";
    let codeLines: string[] = [];

    for (const line of lines) {
        const trimline = line.trimStart();
        const startSpaces = line.length - trimline.length;
        const indent = " ".repeat(startSpaces);

        // Start of code block
        const codeBlockStart = trimline.match(/^```(\w+)/);
        if (!inCodeBlock && codeBlockStart) {
            inCodeBlock = true;
            codeLang = codeBlockStart[1];
            codeLines = [];
            continue;
        }

        // End of code block
        if (inCodeBlock && trimline.startsWith("```")) {
            inCodeBlock = false;
            const code = codeLines
                .map(l =>
                    l.replace(/</g, "&lt;").replace(/>/g, "&gt;")).join("\n");

            result.push(
                <div class={CssADV.SMarkdownCode}>
                    <div>
                        {codeLang}
                        <button onclick={() => { navigator.clipboard.writeText(code) }}>Copy</button>
                    </div>
                    <pre><code innerHTML={code}></code></pre>
                </div>
            );
            continue;
        }

        if (inCodeBlock) {
            codeLines.push(line);
            continue;
        }

        // Headers
        const h3 = trimline.match(/^### (.*)/);
        if (h3) {
            result.push(<h3><pre>{indent}{h3[1]}</pre></h3>);
            continue;
        }
        const h2 = trimline.match(/^## (.*)/);
        if (h2) {
            result.push(<h2><pre>{indent}{h2[1]}</pre></h2>);
            continue;
        }
        const h1 = trimline.match(/^# (.*)/);
        if (h1) {
            result.push(<h1><pre>{indent}{h1[1]}</pre></h1>);
            continue;
        }

        // Inline formatting
        let formattedLine = line
            .replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/_(.*?)_/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, "<code>$1</code>")
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

        if (formattedLine.trim()) {
            result.push(
                <pre innerHTML={indent + formattedLine}></pre>
            );
        }
    }

    return result;
}
