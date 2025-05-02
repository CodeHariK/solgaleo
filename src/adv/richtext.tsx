import { createEffect, createSignal, onMount } from "solid-js";
import { CssADV } from "./gen";

/*CSS:

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

type BlockNode = {
    type: string;
    node: Node;
    text?: string;
    level?: number;
    style?: Partial<CSSStyleDeclaration>;
    url?: string;
    items?: string[];
    range?: [start: number, end: number];
    htmlRange?: [start: number, end: number];
    children?: BlockNode[];
}

type EditorData = {
    time: number;
    blocks: BlockNode[];
    version: string;
}

export function RichText() {
    const [fontFamily, setFontFamily] = createSignal("inherit")
    const [fontSize, setFontSize] = createSignal("inherit")
    const [textAlign, setTextAlign] = createSignal("left")
    const [fgColor, setFgColor] = createSignal("#000000")
    const [bgColor, setBgColor] = createSignal("transparent")
    const [padding, setPadding] = createSignal("0px")

    const [selectedRange, setSelectedRange] = createSignal<[number, number] | null>(null)

    let editorRef: HTMLDivElement;

    const history: string[] = [];
    let historyIndex = -1;

    const saveToHistory = (html: string) => {
        if (historyIndex >= 0 && history[historyIndex] === html) return;
        history.splice(historyIndex + 1)
        history.push(html)
        historyIndex = history.length - 1;
    }

    const restoreHistory = () => {
        if (editorRef && history[historyIndex] !== undefined) {
            editorRef.innerHTML = history[historyIndex];
        }
    }

    const undo = () => {
        if (historyIndex > 0) {
            historyIndex--;
            restoreHistory()
        }
    }

    const redo = () => {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            restoreHistory()
        }
    }

    const deserialize = () => {
        const html = prompt("Paste HTML to restore:") || "";
        if (editorRef) {
            editorRef.innerHTML = html;
            saveToHistory(html)
        }
    }

    const applyStyle = (style: Partial<CSSStyleDeclaration>) => {
        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0 || sel.toString().trim() === '') return;

        const range = sel.getRangeAt(0)
        if (!editorRef || !editorRef.contains(range.commonAncestorContainer)) return;

        const element = range.commonAncestorContainer.nodeType === 1 ?
            (range.commonAncestorContainer as HTMLElement) :
            range.commonAncestorContainer.parentElement;

        if (element && element !== editorRef) {
            // Update existing element
            Object.assign(element.style, style)
        } else {
            // Create new span only if no existing element
            const span = document.createElement("span")
            Object.assign(span.style, style)

            span.appendChild(range.extractContents())
            range.insertNode(span)

            const newRange = document.createRange()
            newRange.selectNode(span)
            sel.removeAllRanges()
            sel.addRange(newRange)
        }

        saveToHistory(editorRef.innerHTML)
    }

    const clearFormattingOfSelection = () => {
        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0)

        const fragment = range.extractContents()
        const text = document.createTextNode(fragment.textContent || "")
        range.insertNode(text)

        const newRange = document.createRange()
        newRange.setStartAfter(text)
        newRange.collapse(true)
        sel.removeAllRanges()
        sel.addRange(newRange)

        if (editorRef) {
            saveToHistory(editorRef.innerHTML)
        }
    }

    const applyTag = (tag: string) => {
        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0 || sel.toString().trim() === '') return;

        const range = sel.getRangeAt(0)
        if (!editorRef || !editorRef.contains(range.commonAncestorContainer)) return;

        const el = document.createElement(tag)
        el.appendChild(range.extractContents())
        range.insertNode(el)

        // Keep the formatted text selected
        const newRange = document.createRange()
        newRange.selectNode(el)
        sel.removeAllRanges()
        sel.addRange(newRange)

        saveToHistory(editorRef.innerHTML)
    }

    const insertImage = () => {
        const url = prompt("Enter image URL:") || "";
        if (!url) return;

        const img = document.createElement("img")
        img.src = url;
        img.style.maxWidth = "100%";

        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0)
        if (!editorRef || !editorRef.contains(range.commonAncestorContainer)) return;

        range.insertNode(img)

        const newRange = document.createRange()
        newRange.setStartAfter(img)
        newRange.collapse(true)
        sel.removeAllRanges()
        sel.addRange(newRange)

        saveToHistory(editorRef.innerHTML)
    }

    const insertList = (type: 'ul' | 'ol') => {
        const list = document.createElement(type)
        const item = document.createElement('li')
        item.textContent = "List item";
        list.appendChild(item)

        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0)
        if (!editorRef || !editorRef.contains(range.commonAncestorContainer)) return;

        range.insertNode(list)

        const newRange = document.createRange()
        newRange.setStartAfter(list)
        newRange.collapse(true)
        sel.removeAllRanges()
        sel.addRange(newRange)

        saveToHistory(editorRef.innerHTML)
    }

    const getHtmlOffsets = (editor: HTMLElement, range: Range): [number, number] => {

        // Create a range from start of editor to selection start
        const startRange = document.createRange()
        startRange.setStart(editor, 0)
        startRange.setEnd(range.startContainer, range.startOffset)
        const startContainer = document.createElement('div')
        startContainer.appendChild(startRange.cloneContents())
        const startHtml = startContainer.innerHTML;

        // Create a range from start of editor to selection end
        const endRange = document.createRange()
        endRange.setStart(editor, 0)
        endRange.setEnd(range.endContainer, range.endOffset)
        const endContainer = document.createElement('div')
        endContainer.appendChild(endRange.cloneContents())
        const endHtml = endContainer.innerHTML;

        // console.table([
        //     ["startContainer", range.startContainer],
        //     ["startContainerParent", range.startContainer.parentElement],
        //     ["endContainer", range.endContainer],
        //     ["endContainerParent", range.endContainer.parentElement],
        //     ["startHtml", startHtml, startHtml.length],
        //     ["endHtml", endHtml, endHtml.length],
        // ])

        return [startHtml.length, endHtml.length];
    }

    const handleSelectionChange = () => {
        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0 || !editorRef) {
            setSelectedRange(null)
            return;
        }

        const range = sel.getRangeAt(0)
        if (!editorRef.contains(range.commonAncestorContainer)) {
            setSelectedRange([0, 0])
            return;
        }

        const [start, end] = getHtmlOffsets(editorRef, range)
        setSelectedRange([start, end])
    }

    onMount(() => {
        const initial = '<b>Hi</b> <i>Hi</i>';
        editorRef.innerHTML = initial
        saveToHistory(initial)
        document.addEventListener('selectionchange', handleSelectionChange)
    })

    return (
        <div class={CssADV.RichContainer}>
            <div class={CssADV.RichEditorPane}>

                <div class={CssADV.RichToolbar}>

                    <button onClick={() => applyTag("b")}>Bold</button>
                    <button onClick={() => applyTag("i")}>Italic</button>
                    <button onClick={() => applyTag("u")}>Underline</button>
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

                    <button onClick={clearFormattingOfSelection}>Clear Format</button>
                    <button onClick={undo}>Undo</button>
                    <button onClick={redo}>Redo</button>

                    <button onClick={() => insertList('ul')}>Bullet List</button>
                    <button onClick={() => insertList('ol')}>Number List</button>

                    <button onClick={insertImage}>Image</button>

                    <button onClick={deserialize}>Deserialize</button>

                    <select
                        onChange={(e) => {
                            setTextAlign(e.currentTarget.value)
                            applyStyle({ textAlign: e.currentTarget.value })
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
                        onInput={(e) => {
                            setFgColor(e.currentTarget.value)
                            applyStyle({ color: e.currentTarget.value })
                        }}
                        title="Text Color"
                    />

                    <input
                        type="color"
                        value={bgColor()}
                        onChange={(e) => {
                            setBgColor(e.currentTarget.value)
                            applyStyle({ background: e.currentTarget.value })
                        }}
                        title="Background Color"
                    />

                    <select
                        onChange={(e) => {
                            setPadding(e.currentTarget.value)
                            applyStyle({ padding: e.currentTarget.value })
                        }}
                        value={padding()}
                    >
                        <option value="0px">No Padding</option>
                        <option value="4px">Small</option>
                        <option value="8px">Medium</option>
                        <option value="16px">Large</option>
                    </select>

                    <select
                        value={fontFamily()}
                        onChange={(e) => {
                            setFontFamily(e.currentTarget.value)
                            applyStyle({ fontFamily: e.currentTarget.value })
                        }}
                    >
                        <option value="inherit">Font</option>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                    </select>

                    <select
                        value={fontSize()}
                        onChange={(e) => {
                            setFontSize(e.currentTarget.value)
                            applyStyle({ fontSize: e.currentTarget.value })
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
                    ref={editorRef}
                    class={CssADV.RichEditor}
                    contentEditable
                    onInput={(e) => {
                        const html = (e.currentTarget as HTMLElement).innerHTML;
                        saveToHistory(html)
                    }}
                // onBlur={(e) => {
                //     const html = (e.currentTarget as HTMLElement).innerHTML;
                // }}
                >
                </div>
            </div>

            <div
                class={CssADV.RichPreview}
            >
                <div style={{ "white-space": "pre-wrap" }}>
                    <JSONRenderer
                        data={editorRef}
                        range={selectedRange()}
                        onSelect={(block) => { selectElementFromJson(block, editorRef) }}
                    />
                </div>
            </div>

        </div>
    )
}

const BlockRenderer = (props: {
    block: BlockNode,
    depth: number,
    range: [start: number, end: number],
    onSelect: (block: BlockNode) => void
}) => {
    const colors = ['#61bbfb', '#cef682', '#9533ff', '#f8be61', '#f13a84'];

    const isHighlighted = () => {
        if (!props.range) return false;
        const [selStart, selEnd] = props.range;

        // Only use HTML range since we're tracking HTML positions
        if (props.block.htmlRange) {
            const [blockStart, blockEnd] = props.block.htmlRange;

            // Check if ranges overlap
            // Block starts before selection ends AND block ends after selection starts
            if (blockStart < selEnd && blockEnd > selStart) return true;
        }

        return false;
    }

    return (
        <div style={{
            "margin-left": `${props.depth * 20}px`,
            "border": "2px solid",
            "border-color": isHighlighted() ? "#ff6767" : colors[props.depth % colors.length],
            "margin": "2px",
            "border-radius": "4px",
            "cursor": "pointer",
            "transition": "background-color 0.2s"
        }}
            onClick={(e) => {
                e.stopPropagation()
                props.onSelect(props.block)
            }}
        >
            <div style={{ "font-weight": "bold" }}>type: {props.block.type}</div>
            {props.block.text && (
                <div style={{ "color": "#2c7aa7" }}>text: {props.block.text}</div>
            )}
            {props.block.range && (
                <div style={{ "color": "#69a63e" }}>
                    range: [{props.block.range[0]}, {props.block.range[1]}]
                </div>
            )}
            {props.block.htmlRange && (
                <div style={{ "color": "#e69a21" }}>
                    range: [{props.block.htmlRange[0]}, {props.block.htmlRange[1]}]
                </div>
            )}
            {props.block.style && (
                <div style={{ "color": "#d1d63d" }}>
                    style: {JSON.stringify(props.block.style)}
                </div>
            )}
            {props.block.children?.map(child => (
                <BlockRenderer
                    block={child}
                    depth={props.depth + 1}
                    range={props.range}
                    onSelect={props.onSelect}
                />
            ))}
        </div>
    )
}

const JSONRenderer = (props: {
    data: HTMLDivElement;
    range: [start: number, end: number],
    onSelect: (block: BlockNode) => void;
}) => {
    // Create signals for reactive data
    const [editorData, setEditorData] = createSignal<EditorData>({
        version: "0",
        blocks: [],
        time: 0
    });
    const [htmlContent, setHtmlContent] = createSignal('');

    // Create mutation observer to track DOM changes
    let observer: MutationObserver;

    // Create effect to update data when editor changes
    createEffect(() => {
        if (!props.data) return;

        // Setup mutation observer
        observer?.disconnect();
        observer = new MutationObserver(() => {
            const html = props.data.innerHTML;
            setHtmlContent(html);
            const newData = htmlToBlocks(props.data);
            setEditorData(newData);
        });

        // Start observing editor changes
        observer.observe(props.data, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
        });

        // Initial data load
        const html = props.data.innerHTML;
        setHtmlContent(html);
        const newData = htmlToBlocks(props.data);
        setEditorData(newData);

        // Cleanup observer on effect cleanup
        return () => observer.disconnect();
    });

    return (
        <div style={{ "font-family": "monospace" }}>
            version: {editorData().version}
            <hr />
            selected : {props.range ? `[${props.range[0]}:${props.range[1]})` : ''}
            <hr />
            {(props.range?.length == 2) ? <>
                {htmlContent().substring(0, props.range[0])}
                <span style={{ color: "red" }}>
                    {htmlContent().substring(props.range[0], props.range[1])}
                </span>
                {htmlContent().substring(props.range[1])}
            </> : htmlContent()}
            {
                editorData().blocks.map(block => (
                    <BlockRenderer
                        block={block}
                        depth={0}
                        range={props.range}
                        onSelect={props.onSelect}
                    />
                ))
            }
        </div>
    );
}

const htmlToBlocks = (editor: HTMLElement): EditorData => {
    const blocks: BlockNode[] = [];

    console.log("Hello")

    const processNode = (node: Node, textStart: number, htmlStart: number): BlockNode | null => {
        // Handle text nodes
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const textLength = node.textContent.length;
            return {
                type: 'text',
                node: node,  // Store reference to actual text node
                text: node.textContent,
                range: [textStart, textStart + textLength],
                htmlRange: [htmlStart, htmlStart + textLength]
            };
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const children: BlockNode[] = [];
            let currentTextOffset = textStart;
            let currentHtmlOffset = htmlStart + el.outerHTML.indexOf('>') + 1;

            // Process child nodes
            Array.from(el.childNodes).forEach(child => {
                const textLength = child.textContent?.length || 0;
                const childHtmlLength = child.nodeType === Node.ELEMENT_NODE ?
                    (child as HTMLElement).outerHTML.length : textLength;

                const childBlock = processNode(child, currentTextOffset, currentHtmlOffset);
                if (childBlock) {
                    children.push(childBlock);
                }
                currentTextOffset += textLength;
                currentHtmlOffset += childHtmlLength;
            });

            return {
                type: el.tagName.toLowerCase(),
                node: el,  // Store reference to actual element
                style: el.style.cssText ? Object.fromEntries(
                    el.style.cssText.split(';')
                        .map(s => s.split(':').map(p => p.trim()))
                        .filter(p => p.length === 2)
                ) : undefined,
                range: [textStart, currentTextOffset],
                htmlRange: [htmlStart, htmlStart + el.outerHTML.length],
                text: (children.length === 1) ? children[0].text : undefined,
                children: children.length > 0 ? children : undefined
            };
        }
        return null;
    };

    let textOffset = 0;
    let htmlOffset = 0;
    Array.from(editor.childNodes).forEach(node => {
        const block = processNode(node, textOffset, htmlOffset);
        if (block) {
            textOffset = block.range[1];
            htmlOffset = block.htmlRange[1];
            blocks.push(block);
        }
    });

    console.log(blocks)

    return {
        time: Date.now(),
        blocks,
        version: Date.now().toString()
    };
};

const findNodeInEditor = (editor: HTMLElement, block: BlockNode): Node | null => {
    const walker = document.createTreeWalker(
        editor,
        NodeFilter.SHOW_ALL,
        {
            acceptNode: (node: Node) => {

                console.table(
                    [
                        [block, node.textContent == block.node.textContent && node.nodeType == block.node.nodeType],
                        [node, block.node],
                        [node.textContent, block.node.textContent],
                        [node.nodeType, block.node.nodeType],
                    ])

                if (node == block.node) {
                    return NodeFilter.FILTER_ACCEPT;
                }

                return NodeFilter.FILTER_SKIP;

            }
        }
    )
    return walker.nextNode()
}

const selectElementFromJson = (block: BlockNode, editor: HTMLDivElement) => {
    if (!editor) return;

    const node = findNodeInEditor(editor, block)
    if (!node) return;

    const range = document.createRange()
    range.selectNode(node)

    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
}
