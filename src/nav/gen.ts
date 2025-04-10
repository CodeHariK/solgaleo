import '../gen.css'
import "./gen.css"
export * from "./pagination.tsx";
export * from "./tab.tsx";
export * from "./breadcrumb.tsx";
export * from "./header.tsx";
export * from "./modal.tsx";


export const CssNAV = {
    PaginationNav: "PaginationNav",
    PaginationList: "PaginationList",
    PaginationButton: "PaginationButton",
    PaginationActive: "PaginationActive",
    PaginationItem: "PaginationItem",
    TabsContainer: "tabs-container",
    TabsLevels: "tabs-levels",
    TabLevel: "tab-level",
    TabButton: "tab-button",
    TabContent: "tab-content",
    Breadcrumb: "Breadcrumb",
    BreadcrumbLinks: "BreadcrumbLinks",
    BreadcrumbLink: "BreadcrumbLink",
    BreadcrumbSeparator: "BreadcrumbSeparator",
    HeaderLink: "HeaderLink",
    HeaderNav: "HeaderNav",
    HeaderLeft: "HeaderLeft",
    HeaderLogo: "HeaderLogo",
    HeaderLogoContent: "HeaderLogoContent",
    HeaderIcon: "HeaderIcon",
    HeaderLinks: "HeaderLinks",
    HeaderRight: "HeaderRight",
    TransitionContainer: "TransitionContainer",
    TransitionItem: "TransitionItem",
    Show: "Show",
    Hide: "Hide",

    
} as const;

export type CssNAVType = keyof typeof CssNAV;
