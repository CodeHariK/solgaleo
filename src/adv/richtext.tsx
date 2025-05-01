import { createSignal, onMount } from "solid-js";
import { CssADV } from "./gen";

/*CSS:*

.RichContainer {
    display: flex;
    gap: 1rem;
}

.RichEditorPane, .preview-pane {
    flex: 1;
    background: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

.RichToolbar {
    padding: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    button, select {
        padding: 0.2rem 0.4rem;
    }

    input[type="color"] {
        width: 32px;
        height: 32px;
        padding: 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
        border: none;
        border-radius: 4px;
    }
}

.RichEditor {
    flex: 1;
    padding: 1rem;
    min-height: 300px;
    outline: none;

    img {
        max-width: 100%;
        height: auto;
        margin: 0.5rem 0;
    }
    
    ul, ol {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
    }
    
    li {
        margin: 0.25rem 0;
    }
}

.RichPreview {
    width: 40%;
    padding: 1rem;
    font-family: monospace;
    overflow: auto;
    
    pre {
        white-space: pre-wrap;
        word-break: break-word;
        margin-bottom: 1rem;
    }
    
    span[style*="background-color"] {
        display: inline-block;
        padding: 0 2px;
        border-radius: 2px;
    }

    span[style*="cursor: pointer"] {
        text-decoration: underline;
        
        &:hover {
            opacity: 0.8;
        }
        
        &:active {
            opacity: 0.6;
        }
    }
}
*/

declare global {
    interface Window {
        lastBlockData?: BlockNode;
    }
}

// Add these types at the top of the file
type BlockNode = {
    type: string;
    data: {
        text?: string;
        level?: number;
        style?: Partial<CSSStyleDeclaration>;
        url?: string;
        items?: string[];
        range?: [start: number, end: number]
    };
    children?: BlockNode[];
};

type EditorData = {
    time: number;
    blocks: BlockNode[];
    version: string;
};

// Add these conversion functions
const htmlToBlocks = (html: string): EditorData => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const blocks: BlockNode[] = [];

    const processNode = (node: Node, start: number, end: number): BlockNode | null => {

        // console.log(node.nodeName, node.nodeType, node.textContent, node, node.nodeValue)

        // Handle text nodes
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            return {
                type: 'text',
                data: {
                    text: node.textContent,
                    range: [start, end]
                }
            };
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const children: BlockNode[] = [];
            let currentOffset = start;

            // Process child nodes first
            Array.from(el.childNodes).forEach(child => {
                const length = child.textContent?.length || 0;
                const childBlock = processNode(child, currentOffset, currentOffset + length);
                if (childBlock) {
                    children.push(childBlock);
                }
                currentOffset += length;
            });

            return {
                type: el.tagName,
                data: {
                    style: el.style.cssText ? Object.fromEntries(
                        el.style.cssText.split(';')
                            .map(s => s.split(':').map(p => p.trim()))
                            .filter(p => p.length === 2)
                    ) : undefined,
                    range: [start, end],
                    text: (children.length == 1) ? children[0].data.text : undefined
                },
                children: children.length > 1 ? children : undefined
            };
        }
        return null;
    };

    // Start processing from root elements
    Array.from(temp.childNodes).forEach(node => {
        const length = node.textContent?.length || 0;
        const block = processNode(node, 0, length);
        if (block) blocks.push(block);
    });

    return {
        time: Date.now(),
        blocks,
        version: "2.28.2"
    };
};

function findElementByText(root: Node, text: string): HTMLElement | null {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: (node: Node) => {
                return node.textContent === text ?
                    NodeFilter.FILTER_ACCEPT :
                    NodeFilter.FILTER_SKIP;
            }
        }
    );

    return walker.nextNode() as HTMLElement;
}

export function RichText() {
    const [content, setContent] = createSignal("");
    const [highlightedContent, setHighlightedContent] = createSignal("");
    const [fontFamily, setFontFamily] = createSignal("inherit");
    const [fontSize, setFontSize] = createSignal("inherit");
    const [textAlign, setTextAlign] = createSignal("left");
    const [fgColor, setFgColor] = createSignal("#000000");
    const [bgColor, setBgColor] = createSignal("transparent");
    const [padding, setPadding] = createSignal("0px");

    let editor: HTMLDivElement;

    const history: string[] = [];
    let historyIndex = -1;

    const saveToHistory = (html: string) => {
        if (historyIndex >= 0 && history[historyIndex] === html) return;
        history.splice(historyIndex + 1);
        history.push(html);
        historyIndex = history.length - 1;
    };

    const restoreHistory = () => {
        if (editor && history[historyIndex] !== undefined) {
            editor.innerHTML = history[historyIndex];
            setContent(history[historyIndex]);
        }
    };

    const undo = () => {
        if (historyIndex > 0) {
            historyIndex--;
            restoreHistory();
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            restoreHistory();
        }
    };

    const deserialize = () => {
        const html = prompt("Paste HTML to restore:") || "";
        if (editor) {
            editor.innerHTML = html;
            setContent(html);
            saveToHistory(html);
        }
    };

    const selectElementFromJson = (blockData: BlockNode) => {
        if (!editor) return;

        const text = blockData.data.text;
        if (!text) return;

        const element = findElementByText(editor, text);
        if (!element) return;

        const range = document.createRange();
        range.selectNode(element);

        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
    };

    // Modify applyStyle to update existing element if selected
    const applyStyle = (style: Partial<CSSStyleDeclaration>) => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.toString().trim() === '') return;

        const range = sel.getRangeAt(0);
        if (!editor || !editor.contains(range.commonAncestorContainer)) return;

        const element = range.commonAncestorContainer.nodeType === 1 ?
            (range.commonAncestorContainer as HTMLElement) :
            range.commonAncestorContainer.parentElement;

        if (element && element !== editor) {
            // Update existing element
            Object.assign(element.style, style);
        } else {
            // Create new span only if no existing element
            const span = document.createElement("span");
            Object.assign(span.style, style);
            span.appendChild(range.extractContents());
            range.insertNode(span);

            const newRange = document.createRange();
            newRange.selectNode(span);
            sel.removeAllRanges();
            sel.addRange(newRange);
        }

        setContent(editor.innerHTML);
        saveToHistory(editor.innerHTML);
    };


    const clearFormattingOfSelection = () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0);

        const fragment = range.extractContents();
        const text = document.createTextNode(fragment.textContent || "");
        range.insertNode(text);

        const newRange = document.createRange();
        newRange.setStartAfter(text);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);

        if (editor) {
            setContent(editor.innerHTML);
            saveToHistory(editor.innerHTML);
        }
    };

    const applyTag = (tag: string) => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.toString().trim() === '') return;

        const range = sel.getRangeAt(0);
        if (!editor || !editor.contains(range.commonAncestorContainer)) return;

        const el = document.createElement(tag);
        el.appendChild(range.extractContents());
        range.insertNode(el);

        // Keep the formatted text selected
        const newRange = document.createRange();
        newRange.selectNode(el);
        sel.removeAllRanges();
        sel.addRange(newRange);

        setContent(editor.innerHTML);
        saveToHistory(editor.innerHTML);
    };

    const applyFontStyle = () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.toString().trim() === '') return;

        const range = sel.getRangeAt(0);
        if (!editor || !editor.contains(range.commonAncestorContainer)) return;

        const span = document.createElement("span");
        if (fontFamily() !== "inherit") span.style.fontFamily = fontFamily();
        if (fontSize() !== "inherit") span.style.fontSize = fontSize();
        span.appendChild(range.extractContents());
        range.insertNode(span);

        // Maintain selection
        const newRange = document.createRange();
        newRange.selectNode(span);
        sel.removeAllRanges();
        sel.addRange(newRange);

        setContent(editor.innerHTML);
        saveToHistory(editor.innerHTML);
    };

    const insertImage = () => {
        const url = prompt("Enter image URL:") || "";
        if (!url) return;

        const img = document.createElement("img");
        img.src = url;
        img.style.maxWidth = "100%";

        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0);
        if (!editor || !editor.contains(range.commonAncestorContainer)) return;

        range.insertNode(img);

        const newRange = document.createRange();
        newRange.setStartAfter(img);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);

        setContent(editor.innerHTML);
        saveToHistory(editor.innerHTML);
    };

    const insertList = (type: 'ul' | 'ol') => {
        const list = document.createElement(type);
        const item = document.createElement('li');
        item.textContent = "List item";
        list.appendChild(item);

        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0);
        if (!editor || !editor.contains(range.commonAncestorContainer)) return;

        range.insertNode(list);

        const newRange = document.createRange();
        newRange.setStartAfter(list);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);

        setContent(editor.innerHTML);
        saveToHistory(editor.innerHTML);
    };

    const handleSelectionChange = () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || !editor) {
            setHighlightedContent(content());
            return;
        }

        const range = sel.getRangeAt(0);
        if (!editor.contains(range.commonAncestorContainer)) {
            setHighlightedContent(content());
            return;
        }

        // Clone the editor content
        const tempDiv = editor.cloneNode(true) as HTMLDivElement;
        const tempRange = document.createRange();
        tempRange.setStart(tempDiv, 0);
        tempRange.setEnd(tempDiv, tempDiv.childNodes.length);

        // Add highlight to selected content
        const selectedContent = tempDiv.innerHTML.replace(
            sel.toString(),
            `<span style="background-color: #ffeb3b">${sel.toString()}</span>`
        );
        setHighlightedContent(selectedContent);
    };

    onMount(() => {
        const initial = "<p>Edit this text...</p>";
        setContent(initial);
        saveToHistory(initial);
        document.addEventListener('selectionchange', handleSelectionChange);
    });

    return (
        <div class={CssADV.RichContainer}>
            <div class={CssADV.RichEditorPane}>
                <div class={CssADV.RichToolbar}>
                    <button onClick={() => applyTag("b")}>Bold</button>
                    <button onClick={() => applyTag("i")}>Italic</button>
                    <button onClick={() => applyTag("u")}>Underline</button>
                    <button onClick={clearFormattingOfSelection}>Clear Format</button>
                    <select
                        onChange={(e) => applyTag(e.currentTarget.value)}
                        value="p"
                    >
                        <option value="p">Normal</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                        <option value="h5">Heading 5</option>
                        <option value="h6">Heading 6</option>
                    </select>
                    <button onClick={() => insertList('ul')}>Bullet List</button>
                    <button onClick={() => insertList('ol')}>Number List</button>
                    <button onClick={insertImage}>Image</button>
                    <button onClick={undo}>Undo</button>
                    <button onClick={redo}>Redo</button>
                    <button onClick={deserialize}>Deserialize</button>
                    <select
                        onChange={(e) => {
                            setTextAlign(e.currentTarget.value);
                            applyStyle({ textAlign: e.currentTarget.value });
                        }}
                        value={textAlign()}
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                        <option value="justify">Justify</option>
                    </select>
                    <input
                        type="color"
                        value={fgColor()}
                        onChange={(e) => {
                            setFgColor(e.currentTarget.value);
                            applyStyle({ color: e.currentTarget.value });
                        }}
                        title="Text Color"
                    />
                    <input
                        type="color"
                        value={bgColor()}
                        onChange={(e) => {
                            setBgColor(e.currentTarget.value);
                            applyStyle({ backgroundColor: e.currentTarget.value });
                        }}
                        title="Background Color"
                    />
                    <select
                        onChange={(e) => {
                            setPadding(e.currentTarget.value);
                            applyStyle({ padding: e.currentTarget.value });
                        }}
                        value={padding()}
                    >
                        <option value="0px">No Padding</option>
                        <option value="4px">Small</option>
                        <option value="8px">Medium</option>
                        <option value="16px">Large</option>
                    </select>
                    <select
                        onChange={(e) => {
                            setFontFamily(e.currentTarget.value);
                            applyFontStyle();
                        }}
                    >
                        <option value="inherit">Font</option>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                    </select>
                    <select
                        onChange={(e) => {
                            setFontSize(e.currentTarget.value);
                            applyFontStyle();
                        }}
                    >
                        <option value="inherit">Size</option>
                        <option value="12px">12</option>
                        <option value="14px">14</option>
                        <option value="16px">16</option>
                        <option value="18px">18</option>
                        <option value="24px">24</option>
                    </select>
                </div>

                <div
                    ref={editor}
                    class={CssADV.RichEditor}
                    contentEditable
                    onInput={(e) => {
                        const html = (e.currentTarget as HTMLElement).innerHTML;
                        setContent(html);
                        saveToHistory(html);
                    }}
                    onBlur={(e) => {
                        const html = (e.currentTarget as HTMLElement).innerHTML;
                        setContent(html);
                    }}
                >
                    <p>Edit this text...</p>
                </div>
            </div>

            <div
                class={CssADV.RichPreview}
                onClick={() => {
                    if (window.lastBlockData) {
                        selectElementFromJson(window.lastBlockData);
                        window.lastBlockData = undefined;
                    }
                }}
            >
                <h3>HTML:</h3>
                <pre innerHTML={highlightedContent()}></pre>
                <h3>JSON:</h3>
                <pre style={{ "white-space": "pre-wrap" }}>
                    {(() => {
                        const data = htmlToBlocks(content());
                        return JSON.stringify(data, (key, value) => {
                            if (key === 'text' && typeof value === 'string') {
                                return value;
                            }
                            return value;
                        }, 2);
                    })()}
                </pre>
            </div>

        </div>
    );
}
