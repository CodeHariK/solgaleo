import { JSX } from "solid-js";

import { CssUI } from "./gen.ts";

/*CSS:
.GridLayout {
    width: 100%;
    height: 100vh;
    display: grid;
    gap: .1rem;
}
// Mode 1: Fixed header/footer
.GridLayoutFixed {
    grid-template-areas:
        "header  header  header"
        "left   middle  right"
        "footer footer  footer";
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr auto;
}

// When sides are missing, middle expands
.GridLayoutFixed:not(:has(nav)) {
    grid-template-columns: 1fr;
    grid-template-areas:
        "header"
        "middle"
        "footer";
}

.GridLayoutFixed:has(nav):not(:has(aside)) {
    grid-template-columns: minmax(200px, 15%) 1fr;
    grid-template-areas:
        "header header"
        "left   middle"
        "footer footer";
}

// Mode 2: Scrollable header/footer
.GridLayoutScroll {
    grid-template-areas: "left middle right";
    grid-template-columns: auto 1fr auto;
}

.GridLayoutScroll:not(:has(nav)) {
    grid-template-columns: 1fr;
    grid-template-areas: "middle";
}

.GridLayoutScroll:has(nav):not(:has(aside)) {
    grid-template-columns: minmax(200px, 15%) 1fr;
    grid-template-areas: "left middle";
}

.GridHeader {
    grid-area: header;
}

.GridFooter {
    grid-area: footer;
}

.GridLeft {
    grid-area: left;
    overflow-y: auto;
    border-right: 1px solid var(--border-color, #e5e7eb);
}

.GridRight {
    grid-area: right;
    overflow-y: auto;
    border-left: 1px solid var(--border-color, #e5e7eb);
}

.GridMiddle {
    grid-area: middle;
    overflow-y: auto;
}

// For the scrollable mode, wrap header/footer inside middle
.GridScrollContainer {
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

.GridContent {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}

// Mode 3: Everything flows together with side panels
.GridLayoutFlow {
    grid-template-areas:
        "header header header"
        "left  middle right";
    grid-template-columns: auto 1fr auto;
}

.GridLayoutFlow:not(:has(nav)) {
    grid-template-columns: 1fr;
    grid-template-areas:
        "header"
        "middle";
}

.GridLayoutFlow:has(nav):not(:has(aside)) {
    grid-template-columns: minmax(200px, 15%) 1fr;
    grid-template-areas:
        "header header"
        "left  middle";
}

// Keep side panels in position but allow content to flow
.GridLayoutFlow .GridLeft,
.GridLayoutFlow .GridRight {
    position: static;
    height: auto;
    padding-top: 1rem;
    border: none;
    border-right: 1px solid var(--border-color, #e5e7eb);
    overflow: visible;
}

.GridLayoutFlow .GridRight {
    border-right: none;
    border-left: 1px solid var(--border-color, #e5e7eb);
}

.GridLayoutFlow .GridMiddle {
    overflow: visible;
}

.GridLayoutFlow .GridScrollContainer {
    min-height: auto;
}

.GridLayoutFlow .GridContent {
    overflow: visible;
}

.GridLayoutFlow .GridFooter {
    grid-column: 1 / -1;
    margin-top: 1rem;
}
*/

type GridLayoutProps = {
    header?: JSX.Element;
    footer?: JSX.Element;
    left?: JSX.Element;
    right?: JSX.Element;
    children?: JSX.Element;
    mode?: 'fixed' | 'scroll' | 'flow';
};

export function GridLayout({
    header,
    footer,
    left,
    right,
    children,
    mode = 'fixed'
}: GridLayoutProps) {

    if (mode == 'fixed') {
        return (
            <main class={`${CssUI.GridLayout} ${CssUI.GridLayoutFixed}`}>
                {header && <header class={CssUI.GridHeader}>{header}</header>}
                {left && <nav class={CssUI.GridLeft}>{left}</nav>}
                {children && <section class={CssUI.GridMiddle}>{children}</section>}
                {right && <aside class={CssUI.GridRight}>{right}</aside>}
                {footer && <footer class={CssUI.GridFooter}>{footer}</footer>}
            </main>
        )
    } else if (mode == 'scroll') {
        return (
            <main class={`${CssUI.GridLayout} ${CssUI.GridLayoutScroll}`}>
                {left && <nav class={CssUI.GridLeft}>{left}</nav>}
                <section class={CssUI.GridMiddle}>
                    <div class={CssUI.GridScrollContainer}>
                        {header && <header class={CssUI.GridHeader}>{header}</header>}
                        {children && <div class={CssUI.GridContent}>{children}</div>}
                        {footer && <footer class={CssUI.GridFooter}>{footer}</footer>}
                    </div>
                </section>
                {right && <aside class={CssUI.GridRight}>{right}</aside>}
            </main>
        )
    } else {
        return (
            <main class={`${CssUI.GridLayout} ${CssUI.GridLayoutFlow}`}>
                {header && <header class={CssUI.GridHeader}>{header}</header>}
                {left && <nav class={CssUI.GridLeft}>{left}</nav>}
                <section class={CssUI.GridMiddle}>
                    <div class={CssUI.GridScrollContainer}>
                        {children && <div class={CssUI.GridContent}>{children}</div>}
                    </div>
                </section>
                {right && <aside class={CssUI.GridRight}>{right}</aside>}
                {footer && <footer class={CssUI.GridFooter}>{footer}</footer>}
            </main>
        )
    }
}

/*CSS:

.ListContainer {
    padding: 1rem;
}

.List {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.ListItem {
    min-height: 200px;
    border-radius: 0.5rem;
    padding: 1.5rem;
    color: white;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition: transform 0.2s ease-in-out;
}

.ListItem:hover {
    transform: translateY(-2px);
}

.Red {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.Orange {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.Blue {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.Green {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
}
*/

export function List() {
    return (
        <div class={CssUI.ListContainer}>
            <ul class={CssUI.List}>
                <li class={`${CssUI.ListItem} ${CssUI.Red}`}>
                    Panel Item 1
                </li>
                <li class={`${CssUI.ListItem} ${CssUI.Orange}`}>
                    Panel Item 2
                </li>
                <li class={`${CssUI.ListItem} ${CssUI.Blue}`}>
                    Panel Item 3
                </li>
                <li class={`${CssUI.ListItem} ${CssUI.Green}`}>
                    Panel Item 4
                </li>
            </ul>
        </div>
    );
}
