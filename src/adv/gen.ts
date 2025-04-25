import '../gen.css'

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
    ScrollLayout: "scroll-layout",
    Carousel: "carousel",
    Vcarousel: "vcarousel",

    

    
} as const;

export type CssADVType = keyof typeof CssADV;
