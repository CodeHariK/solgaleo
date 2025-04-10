import '../gen.css'
import "./gen.css"
export * from "./md.tsx";
export * from "./treeview.tsx";
export * from "./blog.tsx";
export * from "./table.tsx";
export * from "./stepper.tsx";


export const CssADV = {
    SMarkdown: "SMarkdown",
    SMarkdownCode: "SMarkdownCode",
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
    Stepper: "stepper",

    varSMarkdownBg: "--SMarkdown-bg",
    varSMarkdownCodeCol: "--SMarkdownCode-col",
    varSMarkdownCodeBg: "--SMarkdownCode-bg",
    varSMarkdownCodeDivBg: "--SMarkdownCode--div-bg",
    varBlogBorder: "--blog-border",
    varBlogBg: "--blog-bg",
    varBlogHoverBg: "--blog-hover-bg",
    varBlogTitleColor: "--blog-title-color",
    varBlogUnderlineColor: "--blog-underline-color",
    varTagBg: "--tag-bg",
    varTagColor: "--tag-color",
    varTagHoverBg: "--tag-hover-bg",
    varTagHoverColor: "--tag-hover-color",
    varBlogDescriptionColor: "--blog-description-color",
    varStepperCol: "--stepper-col",
    varStepperBg: "--stepper-bg",
    varStepperBorder: "--stepper-border"
} as const;

export type CssADVType = keyof typeof CssADV;
