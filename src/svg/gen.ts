import '../gen.css'
import "./gen.css"
export * from "./svg.tsx";


export const SolCSS = {
    AnimateSpin: "animate-spin",

    varIconWidth: "--icon-width",
    varIconHeight: "--icon-height",
    varIconColor: "--icon-color"
} as const;

export type SolCSSType = keyof typeof SolCSS;
