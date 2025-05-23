import '../gen.css'

export * from "./tab.tsx"; 
export * from "./useRoutes.tsx"; 
export * from "./breadcrumb.tsx"; 
export * from "./header.tsx"; 
export * from "./modal.tsx";


export const CssNAV = {
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
    BottomBar: "BottomBar",
    BottomBarItem: "BottomBarItem",
    MobileHeader: "MobileHeader",
    ModalOverlay: "ModalOverlay",
    ModalContent: "ModalContent",
    ModalContentShow: "ModalContentShow",

    

    
} as const;

export type CssNAVType = keyof typeof CssNAV;
