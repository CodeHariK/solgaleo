import '../gen.css'
import "./gen.css"
export * from "./md.tsx"; 
export * from "./slides.tsx"; 
export * from "./blog.tsx"; 
export * from "./table.tsx"; 
export * from "./carousel.tsx";


export const CssADV = {
    Markdown: "Markdown",
    MarkdownCode: "MarkdownCode",
    Slides: "Slides",
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
    Vcarousel: "vcarousel",
    ScrollLayout: "scroll-layout",
    Carousel: "carousel",

    varSurface: "--surface",
    varPrimaryContainer: "--primary-container",
    varMarkdownCodeBg: "--MarkdownCode-bg",
    varEaseSpring3: "--ease-spring-3",
    varSecondary: "--secondary",
    varPrimary: "--primary",
    varDisabled: "--disabled",
    varDisabledContainer: "--disabled-container",
    varEase3: "--ease-3",
    varSecondaryContainer: "--secondary-container",

    
} as const;

export type CssADVType = keyof typeof CssADV;
