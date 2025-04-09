import '../gen.css'
import "./gen.css"
export * from "./svg.tsx";


export const SolCSS = {
    AnimateSpin: "animate-spin",

    varIconWidth: "--icon-width",
    varIconHeight: "--icon-height",
    varIconColor: "--icon-color",
    varIconBg: "--icon-bg",
    varSvgRingWidth: "--svg-ring-width",
    varSvgRingColor: "--svg-ring-color"
} as const;

export type SolCSSType = keyof typeof SolCSS;
