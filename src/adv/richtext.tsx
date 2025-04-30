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
    box-shadow: 0 0 5px #ccc;
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
    max-width: 30%;
    padding: 1rem;
    font-family: monospace;
    overflow: auto;
    
    pre {
        white-space: pre-wrap;
        word-break: break-word;
    }
    
    span[style*="background-color"] {
        display: inline-block;
        padding: 0 2px;
        border-radius: 2px;
    }
}
*/

export function RichText() {
    const [content, setContent] = createSignal("");
    const [highlightedContent, setHighlightedContent] = createSignal("");
    const [fontFamily, setFontFamily] = createSignal("inherit");
    const [fontSize, setFontSize] = createSignal("inherit");

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

            <div class={CssADV.RichPreview}>
                <h3>Serialized HTML:</h3>
                <pre innerHTML={highlightedContent()}></pre>
            </div>
        </div>
    );
}
