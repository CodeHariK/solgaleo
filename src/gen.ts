
import "./gen.css"

export * from "./svg/gen";
export * from "./ui/gen";
export * from "./adv/gen";
export * from "./fancy/gen";
export * from "./nav/gen";

export const CssSRC = {
    Flex: "flex",
    ItemsCenter: "items-center",
    Gap2: "gap-2",

    varPrimaryContainer: "--primary-container",
    varPrimary: "--primary",
    varSecondary: "--secondary",
    varSecondaryContainer: "--secondary-container",
    varSurface: "--surface",
    varSurfaceContainer: "--surface-container",
    varError: "--error",
    varErrorContainer: "--error-container",
    varBodyBg: "--body-bg",
    varBodyCol: "--body-col"
} as const;

export type CssSRCType = keyof typeof CssSRC;
