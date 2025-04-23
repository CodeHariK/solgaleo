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
    TabsContainer: "TabsContainer",
    TabsLevels: "TabsLevels",
    TabLevel: "TabLevel",
    TabContent: "TabContent",
    TreeView: "TreeView",
    TreeItem: "TreeItem",
    TreeHeader: "TreeHeader",
    TreeActive: "TreeActive",
    TreeToggle: "TreeToggle",
    TreeToggleOpen: "TreeToggleOpen",
    TreeChildren: "TreeChildren",
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

    varPrimaryContainer: "--primary-container",
    varPrimary: "--primary",
    varSurface: "--surface",
    varSecondary: "--secondary",
    varSecondaryContainer: "--secondary-container",
    varModalBg: "--modal-bg",
    varModalCol: "--modal-col",
    varModalFullScreen: "--ModalFullScreen",

    
} as const;

export type CssNAVType = keyof typeof CssNAV;
