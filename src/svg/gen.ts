import '../base.css'
import "./gen.css"

export * from "./svg.tsx";

export const SolCSS = {
    Svg: "svg",
    AnimateSpin: "animate-spin",
    AppIcon: "AppIcon"
} as const;

export type SolCSSType = keyof typeof SolCSS;
