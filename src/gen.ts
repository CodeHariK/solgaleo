
import "./gen.css"

export * from "./svg/gen";
export * from "./ui/gen";
export * from "./adv/gen";
export * from "./fancy/gen";
export * from "./nav/gen";
export * from "./modal/gen";

export const SolCSS = {
    
} as const;

export type SolCSSType = keyof typeof SolCSS;
