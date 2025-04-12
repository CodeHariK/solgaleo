import { JSX } from "solid-js";

import { CssUI } from "./gen.ts";

/*CSS:
.GridLayout {
    width: 100%;
    height: 100vh;
    display: grid;
    gap: .1rem;
}

//   ******    Mode 1: Fixed header/footer   ******    

// Base layout with all panels
.GridLayoutFixed {
    grid-template-areas:
        "header  header  header"
        "left   middle  right"
        "footer footer  footer";
    grid-template-columns: minmax(200px, 15%) 1fr minmax(200px, 15%);
    grid-template-rows: auto 1fr auto;
}

// When both side panels are missing
.GridLayoutFixed:not(:has(> .GridLeft)):not(:has(> .GridRight)) {
    grid-template-columns: 1fr;
    grid-template-areas:
        "header"
        "middle"
        "footer";
}

// When only left panel is missing
.GridLayoutFixed:not(:has(> .GridLeft)):has(> .GridRight) {
    grid-template-columns: 1fr minmax(200px, 15%);
    grid-template-areas:
        "header  header"
        "middle  right"
        "footer  footer";
}

// When only right panel is missing
.GridLayoutFixed:has(> .GridLeft):not(:has(> .GridRight)) {
    grid-template-columns: minmax(200px, 15%) 1fr;
    grid-template-areas:
        "header header"
        "left   middle"
        "footer footer";
}

//   ******    Mode 2: Scrollable header/footer   ******    

.GridLayoutScroll {
    grid-template-areas: "left middle right";
    grid-template-columns: minmax(200px, 15%) 1fr minmax(200px, 15%);
}

.GridLayoutScroll:not(:has(> .GridLeft)):not(:has(> .GridRight)) {
    grid-template-columns: 1fr;
    grid-template-areas: "middle";
}

.GridLayoutScroll:not(:has(> .GridLeft)):has(> .GridRight) {
    grid-template-columns: 1fr minmax(200px, 15%);
    grid-template-areas: "middle right";
}

.GridLayoutScroll:has(> .GridLeft):not(:has(> .GridRight)) {
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

//   ******    Mode 3: Everything flows together with side panels   ******    

.GridLayoutFlow {
    grid-template-areas:
        "header header header"
        "left  middle right";
    grid-template-columns: minmax(200px, 15%) 1fr minmax(200px, 15%);
}

.GridLayoutFlow:not(:has(> .GridLeft)):not(:has(> .GridRight)) {
    grid-template-columns: 1fr;
    grid-template-areas:
        "header"
        "middle";
}

.GridLayoutFlow:not(:has(> .GridLeft)):has(> .GridRight) {
    grid-template-columns: 1fr minmax(200px, 15%);
    grid-template-areas:
        "header header"
        "middle right";
}

.GridLayoutFlow:has(> .GridLeft):not(:has(> .GridRight)) {
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
