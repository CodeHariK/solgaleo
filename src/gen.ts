
import "./gen.css"

export * from "./svg/gen";
export * from "./ui/gen";
export * from "./adv/gen";
export * from "./fancy/gen";
export * from "./nav/gen";

export const SolCSS = {
    Flex: "flex",
    ItemsCenter: "items-center",
    Gap2: "gap-2",

    varBodyBg: "--body-bg",
    varBodyCol: "--body-col"
} as const;

export type SolCSSType = keyof typeof SolCSS;
