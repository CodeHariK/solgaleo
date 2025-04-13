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
    HeaderLink: "HeaderLink",
    HeaderNav: "HeaderNav",
    HeaderLeft: "HeaderLeft",
    HeaderLogo: "HeaderLogo",
    HeaderLogoContent: "HeaderLogoContent",
    HeaderIcon: "HeaderIcon",
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

    varHeaderLinkCol: "--HeaderLink-col",
    varHeaderLinkColHover: "--HeaderLink-col-hover",
    varHeaderLinkColActive: "--HeaderLink-col-active",
    varModalContentBg: "--ModalContent-bg"
} as const;

export type CssNAVType = keyof typeof CssNAV;
