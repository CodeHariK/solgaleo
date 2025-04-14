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
    ModalPositioned: "ModalPositioned",
    ModalClose: "ModalClose",
    ModalFade: "ModalFade",
    ModalSlide: "ModalSlide",
    ModalScale: "ModalScale",
    Show: "Show",

    varModalContentBg: "--ModalContent-bg"
} as const;

export type CssNAVType = keyof typeof CssNAV;
