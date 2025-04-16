
import "./gen.css"

export * from "./svg/gen";
export * from "./ui/gen";
export * from "./adv/gen";
export * from "./fancy/gen";
export * from "./nav/gen";

export const CssSRC = {
    Active: "active",
    Flex: "flex",
    FlexCol: "flex-col",
    FlexWrap: "flex-wrap",
    FlexNowrap: "flex-nowrap",
    ItemsStart: "items-start",
    ItemsEnd: "items-end",
    ItemsCenter: "items-center",
    ItemsBaseline: "items-baseline",
    ItemsStretch: "items-stretch",
    JustifyStart: "justify-start",
    JustifyEnd: "justify-end",
    JustifyCenter: "justify-center",
    JustifyBetween: "justify-between",
    JustifyAround: "justify-around",
    JustifyEvenly: "justify-evenly",
    WFull: "w-full",
    WScreen: "w-screen",
    HFull: "h-full",
    HScreen: "h-screen",
    TextLeft: "text-left",
    TextCenter: "text-center",
    TextRight: "text-right",
    P0: "p0",
    P1: "p1",
    P2: "p2",
    P4: "p4",
    P8: "p8",
    P16: "p16",
    M0: "m0",
    M1: "m1",
    M2: "m2",
    M4: "m4",
    M8: "m8",
    M16: "m16",
    Gap0: "gap0",
    Gap1: "gap1",
    Gap2: "gap2",
    Gap4: "gap4",
    Gap8: "gap8",
    Gap16: "gap16",

    varPrimaryContainer: "--primary-container",
    varPrimary: "--primary",
    varAHoverCol: "--a-hover-col",
    varAActiveCol: "--a-active-col",
    varSpacing: "--spacing",
    varSecondary: "--secondary",
    varSecondaryContainer: "--secondary-container",
    varSurface: "--surface",
    varError: "--error",
    varErrorContainer: "--error-container",
    varDisabled: "--disabled",
    varBodyBg: "--body-bg",
    varBodyCol: "--body-col"
} as const;

export type CssSRCType = keyof typeof CssSRC;
