import '../gen.css'
import "./gen.css"
export * from "./page.fancy.tsx";
export * from "./page.adv.tsx";
export * from "./storybook.tsx";
export * from "./NotFound.tsx";
export * from "./page.ui.tsx";


export const SolCSS = {
    Stepper: "stepper",
    Box: "box",
    Svg: "svg",
    Marquee: "marquee",
    TypewriterAnimation: "typewriter-animation",
    TabLevel: "tab-level",
    FlickerText: "flicker-text",
    Glitter: "Glitter",
    AppTextInput: "AppTextInput",
    Potato: "potato"
} as const;

export type SolCSSType = keyof typeof SolCSS;
