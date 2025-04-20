import '../gen.css'
import "./gen.css"
export * from "./md.tsx";
export * from "./treeview.tsx";
export * from "./blog.tsx";
export * from "./table.tsx";
export * from "./carousel.tsx";


export const CssADV = {
    Markdown: "Markdown",
    MarkdownCode: "MarkdownCode",
    TreeView: "tree-view",
    TreeItem: "tree-item",
    TreeItemContent: "tree-item-content",
    TreeToggle: "tree-toggle",
    TreeChildren: "tree-children",
    BlogContainer: "BlogContainer",
    BlogSection: "BlogSection",
    BlogAside: "BlogAside",
    BlogItem: "BlogItem",
    BlogItemAnimate: "BlogItemAnimate",
    BlogLinkActive: "BlogLinkActive",
    SuperTable: "SuperTable",
    TableHeader: "TableHeader",
    TableFooter: "TableFooter",
    TableHeaderContainer: "TableHeaderContainer",
    CellItem: "CellItem",
    TableRowDetails: "TableRowDetails",
    TableRowDetailsShow: "TableRowDetailsShow",

    varSurface: "--surface",
    varPrimaryContainer: "--primary-container",
    varMarkdownCodeBg: "--MarkdownCode-bg",
    varSecondary: "--secondary"
} as const;

export type CssADVType = keyof typeof CssADV;
