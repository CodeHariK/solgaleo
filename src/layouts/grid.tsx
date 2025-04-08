import { SolCSS } from "./gen.ts";

import { JSX } from "solid-js";

/*CSS:
.GridLayout {
    width: 100%;
    height: 100vh;
    display: grid;
    gap: 1rem;
}
// Mode 1: Fixed header/footer
.GridLayoutFixed {
    grid-template-areas:
        "header  header  header"
        "left   middle  right"
        "footer footer  footer";
    grid-template-columns: minmax(200px, 15%) 1fr minmax(200px, 15%);
    grid-template-rows: auto 1fr auto;
}

// Mode 2: Scrollable header/footer
.GridLayoutScroll {
    grid-template-areas:
        "left   middle  right";
    grid-template-columns: minmax(200px, 15%) 1fr minmax(200px, 15%);
    grid-template-rows: 1fr;
    overflow-y: auto;
}

.GridHeader {
    grid-area: header;
    background: var(--header-bg, #f3f4f6);
    padding: 1rem;
}

.GridFooter {
    grid-area: footer;
    background: var(--footer-bg, #f3f4f6);
    padding: 1rem;
}

.GridLeft {
    grid-area: left;
    overflow-y: auto;
    background: var(--left-bg, #ffffff);
    border-right: 1px solid var(--border-color, #e5e7eb);
}

.GridRight {
    grid-area: right;
    overflow-y: auto;
    background: var(--right-bg, #ffffff);
    border-left: 1px solid var(--border-color, #e5e7eb);
}

.GridMiddle {
    grid-area: middle;
    overflow-y: auto;
    background: var(--middle-bg, #ffffff);
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
    grid-template-columns: minmax(200px, 15%) 1fr minmax(200px, 15%);
    grid-template-rows: auto 1fr;
    overflow-y: auto;
    max-height: 100vh;
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
    middle?: JSX.Element;
    mode?: 'fixed' | 'scroll' | 'flow';
};

export function GridLayout({
    header = 'Header',
    footer = 'Footer',
    left = <p>Hello</p>,
    right = <List />,
    middle = <List />,
    mode = 'fixed'
}: GridLayoutProps) {

    if (mode == 'fixed') {
        return (
            <main class={`${SolCSS.GridLayout} ${SolCSS.GridLayoutFixed}`}>
                <header class={SolCSS.GridHeader}>{header}</header>
                <nav class={SolCSS.GridLeft}>{left}</nav>
                <section class={SolCSS.GridMiddle}>{middle}</section>
                <aside class={SolCSS.GridRight}>{right}</aside>
                <footer class={SolCSS.GridFooter}>{footer}</footer>
            </main>
        )
    } else if (mode == 'scroll') {
        return (
            <main class={`${SolCSS.GridLayout} ${SolCSS.GridLayoutScroll}`}>
                <nav class={SolCSS.GridLeft}>{left}</nav>
                <section class={SolCSS.GridMiddle}>
                    <div class={SolCSS.GridScrollContainer}>
                        <header class={SolCSS.GridHeader}>{header}</header>
                        <div class={SolCSS.GridContent}>{middle}</div>
                        <footer class={SolCSS.GridFooter}>{footer}</footer>
                    </div>
                </section>
                <aside class={SolCSS.GridRight}>{right}</aside>
            </main>
        )
    } else {
        return (
            <main class={`${SolCSS.GridLayout} ${SolCSS.GridLayoutFlow}`}>
                <header class={SolCSS.GridHeader}>{header}</header>
                <nav class={SolCSS.GridLeft}>{left}</nav>
                <section class={SolCSS.GridMiddle}>
                    <div class={SolCSS.GridScrollContainer}>
                        <div class={SolCSS.GridContent}>{middle}</div>
                    </div>
                </section>
                <aside class={SolCSS.GridRight}>{right}</aside>
                <footer class={SolCSS.GridFooter}>{footer}</footer>
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
        <div class={SolCSS.ListContainer}>
            <ul class={SolCSS.List}>
                <li class={`${SolCSS.ListItem} ${SolCSS.Red}`}>
                    Panel Item 1
                </li>
                <li class={`${SolCSS.ListItem} ${SolCSS.Orange}`}>
                    Panel Item 2
                </li>
                <li class={`${SolCSS.ListItem} ${SolCSS.Blue}`}>
                    Panel Item 3
                </li>
                <li class={`${SolCSS.ListItem} ${SolCSS.Green}`}>
                    Panel Item 4
                </li>
            </ul>
        </div>
    );
}
