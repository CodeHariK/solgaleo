import '../gen.css'
import "./gen.css"
export * from "./pagination.tsx";
export * from "./tab.tsx";
export * from "./footer.tsx";
export * from "./breadcrumb.tsx";
export * from "./header.tsx";
export * from "./modal.tsx";


export const SolCSS = {
    TabsContainer: "tabs-container",
    TabsLevels: "tabs-levels",
    TabLevel: "tab-level",
    TabButton: "tab-button",
    TabContent: "tab-content",
    TabPath: "tab-path",
    PathSeparator: "path-separator",
    PathItem: "path-item"
} as const;

export type SolCSSType = keyof typeof SolCSS;
