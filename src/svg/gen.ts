import '../gen.css'
import "./gen.css"
export * from "./svg.tsx";


export const SolCSS = {
    AnimateSpin: "animate-spin",

    varIconWidth: "--icon-width",
    varIconHeight: "--icon-height",
    varIconColor: "--icon-color",
    varIconBg: "--icon-bg"
} as const;

export type SolCSSType = keyof typeof SolCSS;
