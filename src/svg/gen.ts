import '../gen.css'
import "./gen.css"
export * from "./svg.tsx";


export const CssSVG = {
    AnimateSpin: "animate-spin",

    varIconWidth: "--icon-width",
    varIconHeight: "--icon-height"
} as const;

export type CssSVGType = keyof typeof CssSVG;
