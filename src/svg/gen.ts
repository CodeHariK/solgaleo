import '../gen.css'
import "./gen.css"
export * from "./svg.tsx";


export const SolCSS = {
    Flex: "flex",
    Svg: "svg",
    AnimateSpin: "animate-spin",
    AppIcon: "AppIcon"
} as const;

export type SolCSSType = keyof typeof SolCSS;
