import { JSX } from "solid-js";
import { CssADV } from "./gen";

/*CSS:
.Markdown {
    background: var(--surface);
}
.MarkdownCode {
    background: var(--surface);
    
    >div {
        padding: .5rem;
        background: var(--primary-container);
        display: flex;
        justify-content: space-between;
    }
}
.MarkdownImage {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.MarkdownIframe {
    margin: 1rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
}

.MarkdownIframe iframe {
    max-width: 100%;
    border: 1px solid #eaeaea;
    border-radius: 4px;
}

.HeadingLink {
    text-decoration: none;

    * {
        display: inline-block;
    }

    h1::before,
    h2::before,
    h3::before,
    h4::before,
    h5::before,
    h6::before {
        content: "# ";
        opacity: 0;
    }

    h1:hover::before,
    h2:hover::before,
    h3:hover::before,
    h4:hover::before,
    h5:hover::before,
    h6:hover::before {
        opacity: 1;
        cursor: pointer;
    }
}

*/
export function Markdown(props: {
    content: string;
}) {
    const jsxContent = () => parseMarkdownToJSX(props.content);
    return <div class={CssADV.Markdown}>{jsxContent()}</div>;
};

function parseMarkdownToJSX(text: string): JSX.Element[] {
    const lines = text.split("\n");
    const result: JSX.Element[] = [];

    let inCodeBlock = false;
    let codeLang = "";
    let codeLines: string[] = [];

    // For list handling
    let inList = false;
    let listItems: Array<{ content: string, indent: number, type: 'ul' | 'ol' }> = [];

    // For iframe handling
    let inIframeBlock = false;
    let iframeLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimline = line.trimStart();
        const startSpaces = line.length - trimline.length;
        const indent = " ".repeat(startSpaces);

        // Start of code block
        const codeBlockStart = trimline.match(/^```(\w*)/);
        if (!inCodeBlock && !inIframeBlock && codeBlockStart) {
            // Check if this is an iframe block
            if (codeBlockStart[1].toLowerCase() === "iframe") {
                inIframeBlock = true;
                iframeLines = [];
                continue;
            }

            // Regular code block
            inCodeBlock = true;
            codeLang = codeBlockStart[1] || "";
            codeLines = [];
            continue;
        }

        // End of code block
        if ((inCodeBlock || inIframeBlock) && trimline.startsWith("```")) {
            if (inCodeBlock) {
                inCodeBlock = false;
                const code = codeLines
                    .map(l =>
                        l.replace(/</g, "&lt;").replace(/>/g, "&gt;")).join("\n");

                result.push(
                    <div class={CssADV.MarkdownCode}>
                        <div>
                            {codeLang}
                            <button onclick={() => { navigator.clipboard.writeText(code) }}>Copy</button>
                        </div>
                        <pre><code innerHTML={code}></code></pre>
                    </div>
                );
            } else if (inIframeBlock) {
                inIframeBlock = false;
                const iframeContent = iframeLines.join("\n").trim();
                // Process and render the iframe
                result.push(renderIframe(iframeContent));
            }
            continue;
        }

        if (inCodeBlock) {
            codeLines.push(line);
            continue;
        }

        if (inIframeBlock) {
            iframeLines.push(line);
            continue;
        }

        // Detect standalone iframe tags (not in code blocks)
        if (trimline.startsWith("<iframe") && trimline.endsWith("</iframe>")) {
            result.push(renderIframe(trimline));
            continue;
        }

        // Horizontal Rule
        if (trimline.match(/^-{2,}$/) || trimline.match(/^\*{3,}$/)) {
            // If we were in a list, finalize it before adding the HR
            if (inList) {
                result.push(renderNestedList(listItems));
                listItems = [];
                inList = false;
            }

            result.push(<hr />);
            continue;
        }

        // List items
        const ulMatch = trimline.match(/^(\s*)[-*+]\s+(.*)/);
        const olMatch = trimline.match(/^(\s*)\d+\.\s+(.*)/);

        if (ulMatch || olMatch) {
            const match = ulMatch || olMatch;
            const indentSize = startSpaces; // Use actual indentation size
            const content = match[2];
            const listType = ulMatch ? 'ul' : 'ol';

            if (!inList) {
                inList = true;
            }

            listItems.push({
                content,
                indent: indentSize,
                type: listType
            });
            continue;
        } else if (inList && trimline.trim() === '') {
            // Empty line after a list - finalize the list
            result.push(renderNestedList(listItems));
            listItems = [];
            inList = false;
            // Add the empty line
            result.push(<pre>&nbsp;</pre>);
            continue;
        } else if (inList) {
            // If we encounter a non-list line after being in a list, render the list
            result.push(renderNestedList(listItems));
            listItems = [];
            inList = false;
            // Don't continue here - we still need to process this line
        }

        // Headers
        const h4 = trimline.match(/^#### (.*?)(\s*\{#([\w-]+)\})?$/);
        if (h4) {
            const headingText = h4[1];
            const customId = h4[3]; // This will be the ID if provided
            if (customId) {
                result.push(<a class={CssADV.HeadingLink} href={"#" + customId}><h4 id={customId}><pre>{indent}{headingText}</pre></h4></a>);
            } else {
                result.push(<h4><pre>{indent}{headingText}</pre></h4>);
            }
            continue;
        }
        const h3 = trimline.match(/^### (.*?)(\s*\{#([\w-]+)\})?$/);
        if (h3) {
            const headingText = h3[1];
            const customId = h3[3]; // This will be the ID if provided
            if (customId) {
                result.push(<a class={CssADV.HeadingLink} href={"#" + customId}><h3 id={customId}><pre>{indent}{headingText}</pre></h3></a>);
            } else {
                result.push(<h3><pre>{indent}{headingText}</pre></h3>);
            }
            continue;
        }
        const h2 = trimline.match(/^## (.*?)(\s*\{#([\w-]+)\})?$/);
        if (h2) {
            const headingText = h2[1];
            const customId = h2[3];
            if (customId) {
                result.push(<a class={CssADV.HeadingLink} href={"#" + customId}><h2 id={customId}><pre>{indent}{headingText}</pre></h2></a>);
            } else {
                result.push(<h2><pre>{indent}{headingText}</pre></h2>);
            }
            continue;
        }
        const h1 = trimline.match(/^# (.*?)(\s*\{#([\w-]+)\})?$/);
        if (h1) {
            const headingText = h1[1];
            const customId = h1[3];
            if (customId) {
                result.push(<a class={CssADV.HeadingLink} href={"#" + customId}><h1 id={customId}><pre>{indent}{headingText}</pre></h1></a>);
            } else {
                result.push(<h1><pre>{indent}{headingText}</pre></h1>);
            }
            continue;
        }

        // Check for image link pattern: [![alt](img-url)](link-url)
        const imageLinkMatch = trimline.match(/^\[\!\[(.*?)\]\((.*?)\)\]\((.*?)\)$/);
        if (imageLinkMatch) {
            const altText = imageLinkMatch[1];
            const imageUrl = imageLinkMatch[2];
            const linkUrl = imageLinkMatch[3];

            result.push(
                <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                    <img class={CssADV.MarkdownImage} src={imageUrl} alt={altText} title={altText} />
                </a>
            );
            continue;
        }

        // Check for standalone image markdown
        const standaloneImageMatch = trimline.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (standaloneImageMatch) {
            const altText = standaloneImageMatch[1];
            const imageUrl = standaloneImageMatch[2];
            result.push(
                <img class={CssADV.MarkdownImage} src={imageUrl} alt={altText} title={altText} />
            );
            continue;
        }

        // Process content with potentially mixed image links, images, and text
        const processedContent = processComplexLine(line);

        // If we got a complex element back (with images or links), use it directly
        if (Array.isArray(processedContent) || typeof processedContent === 'object') {
            result.push(<div class="markdown-line">{processedContent}</div>);
            continue;
        }

        // Otherwise, it's just a string to format
        let formattedLine = processedContent as string;

        // Empty line handling - make sure to render even completely empty lines
        if (formattedLine.trim() === '') {
            result.push(<pre>&nbsp;</pre>);
        } else {
            result.push(
                <pre innerHTML={formattedLine}></pre>
            );
        }
    }

    // If we ended with an unfinished list
    if (inList && listItems.length > 0) {
        result.push(renderNestedList(listItems));
    }

    return result;
}

// New function to render iframes safely
function renderIframe(iframeHtml: string): JSX.Element {
    // Create a simple wrapper for the iframe that can be styled
    return (
        <div class={CssADV.MarkdownIframe} innerHTML={iframeHtml}></div>
    );
}

// Helper function for processing complex lines with mixed content
function processComplexLine(line: string): JSX.Element[] | string {
    // Track if we found any special elements
    let hasSpecialElements = false;

    // Process image links first: [![alt](img)](url)
    const imageLinkRegex = /\[\!\[(.*?)\]\((.*?)\)\]\((.*?)\)/g;
    let imageLinkMatches = [];
    let match;

    while ((match = imageLinkRegex.exec(line)) !== null) {
        hasSpecialElements = true;
        imageLinkMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            altText: match[1],
            imageUrl: match[2],
            linkUrl: match[3],
            type: 'imageLink'
        });
    }

    // Then process regular images: ![alt](url)
    const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
    let imageMatches = [];

    while ((match = imageRegex.exec(line)) !== null) {
        // Make sure this isn't part of an image link we already found
        let isPartOfImageLink = false;
        for (const imgLink of imageLinkMatches) {
            if (match.index >= imgLink.start && match.index < imgLink.end) {
                isPartOfImageLink = true;
                break;
            }
        }

        if (!isPartOfImageLink) {
            hasSpecialElements = true;
            imageMatches.push({
                start: match.index,
                end: match.index + match[0].length,
                altText: match[1],
                url: match[2],
                type: 'image'
            });
        }
    }

    // Then process regular links: [text](url)
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    let linkMatches = [];

    while ((match = linkRegex.exec(line)) !== null) {
        // Make sure this isn't part of an image or image link we already found
        let isPartOfOtherMatch = false;
        for (const imgLink of [...imageLinkMatches, ...imageMatches]) {
            if (match.index >= imgLink.start && match.index < imgLink.end) {
                isPartOfOtherMatch = true;
                break;
            }
        }

        if (!isPartOfOtherMatch) {
            hasSpecialElements = true;
            linkMatches.push({
                start: match.index,
                end: match.index + match[0].length,
                text: match[1],
                url: match[2],
                type: 'link'
            });
        }
    }

    // If no special elements, return the line for normal processing
    if (!hasSpecialElements) {
        return formatInlineText(line);
    }

    // Combine all matches and sort by position
    const allMatches = [...imageLinkMatches, ...imageMatches, ...linkMatches].sort((a, b) => a.start - b.start);

    // Build the result by processing each segment
    const parts = [];
    let lastIndex = 0;

    for (const match of allMatches) {
        // Add text before this element
        if (match.start > lastIndex) {
            const textPart = line.substring(lastIndex, match.start);
            const formattedText = formatInlineText(textPart);
            parts.push(<span innerHTML={formattedText}></span>);
        }

        // Add the special element
        if (match.type === 'imageLink') {
            parts.push(
                <a href={match.linkUrl} target="_blank" rel="noopener noreferrer" class="image-link">
                    <img class={CssADV.MarkdownImage} src={match.imageUrl} alt={match.altText} title={match.altText} />
                </a>
            );
        } else if (match.type === 'image') {
            parts.push(
                <img class={CssADV.MarkdownImage} src={match.url} alt={match.altText} title={match.altText} />
            );
        } else if (match.type === 'link') {
            // For links, we need to check if the text contains images
            if (match.text.includes('![')) {
                // Complex link with images - not handling this level of nesting
                parts.push(<a href={match.url} target="_blank" rel="noopener noreferrer">{match.text}</a>);
            } else {
                // Regular link with text
                const formattedText = formatInlineText(match.text);
                parts.push(<a href={match.url} target="_blank" rel="noopener noreferrer" innerHTML={formattedText}></a>);
            }
        }

        lastIndex = match.end;
    }

    // Add any remaining text
    if (lastIndex < line.length) {
        const textPart = line.substring(lastIndex);
        const formattedText = formatInlineText(textPart);
        parts.push(<span innerHTML={formattedText}></span>);
    }

    return parts;
}

// Helper function for inline text formatting
function formatInlineText(text: string): string {
    return text
        .replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/_(.*?)_/g, "<em>$1</em>")
        .replace(/`(.*?)`/g, "<code>$1</code>")
        // Skip link processing as we handle it separately
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
}

// Function to render nested lists based on indentation
function renderNestedList(items: Array<{ content: string, indent: number, type: 'ul' | 'ol' }>): JSX.Element {
    if (items.length === 0) return <ul></ul>;

    // Identify all unique indentation levels and map them to nesting depth
    const uniqueIndents = Array.from(new Set(items.map(item => item.indent))).sort((a, b) => a - b);
    const indentToDepth = Object.fromEntries(uniqueIndents.map((indent, index) => [indent, index]));

    // Build a tree structure from list items
    type ListNode = {
        content: string;
        type: 'ul' | 'ol';
        depth: number;
        children: ListNode[];
    };

    const rootNodes: ListNode[] = [];
    const nodeStack: ListNode[] = [];

    for (const item of items) {
        const depth = indentToDepth[item.indent];
        const newNode: ListNode = {
            content: item.content,
            type: item.type,
            depth,
            children: []
        };

        // Find the appropriate parent for this node
        while (nodeStack.length > 0 && nodeStack[nodeStack.length - 1].depth >= depth) {
            nodeStack.pop();
        }

        if (nodeStack.length === 0) {
            // This is a root node
            rootNodes.push(newNode);
        } else {
            // This is a child node
            nodeStack[nodeStack.length - 1].children.push(newNode);
        }

        nodeStack.push(newNode);
    }

    // Render the tree as nested lists
    const renderNode = (node: ListNode): JSX.Element => {
        // Process the content which may contain complex elements
        const processedContent = processComplexLine(node.content);

        // If we got a complex content back
        if (Array.isArray(processedContent)) {
            if (node.children.length === 0) {
                return <li>{processedContent}</li>;
            }

            // Group children by their list type
            const ulChildren = node.children.filter(child => child.type === 'ul');
            const olChildren = node.children.filter(child => child.type === 'ol');

            return (
                <li>
                    {processedContent}
                    {ulChildren.length > 0 && <ul>{ulChildren.map(renderNode)}</ul>}
                    {olChildren.length > 0 && <ol>{olChildren.map(renderNode)}</ol>}
                </li>
            );
        } else {
            // It's a simple string that has been formatted
            if (node.children.length === 0) {
                return <li innerHTML={processedContent as string}></li>;
            }

            // Group children by their list type
            const ulChildren = node.children.filter(child => child.type === 'ul');
            const olChildren = node.children.filter(child => child.type === 'ol');

            return (
                <li>
                    <span innerHTML={processedContent as string}></span>
                    {ulChildren.length > 0 && <ul>{ulChildren.map(renderNode)}</ul>}
                    {olChildren.length > 0 && <ol>{olChildren.map(renderNode)}</ol>}
                </li>
            );
        }
    };

    // Determine the type of the root list (use type of first item)
    const rootType = items[0].type;

    if (rootType === 'ul') {
        return <ul>{rootNodes.map(renderNode)}</ul>;
    } else {
        return <ol>{rootNodes.map(renderNode)}</ol>;
    }
}
