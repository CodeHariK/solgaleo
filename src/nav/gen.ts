import '../gen.css'

export * from "./pagination.tsx"; 
export * from "./tab.tsx"; 
export * from "./useRoutes.tsx"; 
export * from "./breadcrumb.tsx"; 
export * from "./header.tsx"; 
export * from "./modal.tsx";


export const CssNAV = {
    PaginationNav: "PaginationNav",
    PaginationList: "PaginationList",
    PaginationButton: "PaginationButton",
    PaginationActive: "PaginationActive",
    PaginationItem: "PaginationItem",
    TreeView: "TreeView",
    TreeItem: "TreeItem",
    TreeHeader: "TreeHeader",
    TreeActive: "TreeActive",
    TreeToggle: "TreeToggle",
    TreeToggleOpen: "TreeToggleOpen",
    TreeContent: "TreeContent",
    TabsLevels: "TabsLevels",
    TabLevel: "TabLevel",
    TabContent: "TabContent",
    Breadcrumb: "Breadcrumb",
    BreadcrumbLinks: "BreadcrumbLinks",
    BreadcrumbLink: "BreadcrumbLink",
    BreadcrumbSeparator: "BreadcrumbSeparator",
    HeaderNav: "HeaderNav",
    HeaderLeft: "HeaderLeft",
    HeaderLinks: "HeaderLinks",
    HeaderRight: "HeaderRight",
    ModalOverlay: "ModalOverlay",
    ModalContent: "ModalContent",
    ModalContentShow: "ModalContentShow",

    

    
} as const;

export type CssNAVType = keyof typeof CssNAV;
