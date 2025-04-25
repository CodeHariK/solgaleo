import '../gen.css'

export * from "./svg.tsx";


export const CssSVG = {
    AnimateSpin: "animate-spin",

    varSvgSize: "--svg-size"

    
} as const;

export type CssSVGType = keyof typeof CssSVG;
