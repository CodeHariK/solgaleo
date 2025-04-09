import '../gen.css'
import "./gen.css"
export * from "./md.tsx";
export * from "./treeview.tsx";
export * from "./blog.tsx";
export * from "./table.tsx";
export * from "./stepper.tsx";


export const SolCSS = {
    TreeView: "tree-view",
    TreeItem: "tree-item",
    TreeItemContent: "tree-item-content",
    TreeToggle: "tree-toggle",
    TreeChildren: "tree-children",
    BlogList: "blog-list",
    BlogItem: "blog-item",
    BlogTitle: "blog-title",
    BlogMeta: "blog-meta",
    Tags: "tags",
    BlogContainer: "blog-container",
    BlogSidebar: "blog-sidebar",
    BlogLink: "blog-link",
    Stepper: "stepper"
} as const;

export type SolCSSType = keyof typeof SolCSS;
