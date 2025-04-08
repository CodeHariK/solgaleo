import '../base.css'
import "./gen.css"

export * from "./banner.tsx";
export * from "./ghost.tsx";
export * from "./terminal.tsx";
export * from "./marquee.tsx";
export * from "./flicker.tsx";
export * from "./glittercard.tsx";
export * from "./rainbow.tsx";

export const SolCSS = {
    Banner: "banner",
    Ghost: "ghost",
    Ghost__eyes: "ghost__eyes",
    Ghost__eyes_eye: "ghost__eyes_eye",
    Ghost__waves: "ghost__waves",
    Ghost__wave: "ghost__wave",
    Ghost__mouth: "ghost__mouth",
    Active: "active",
    TypewriterAnimation: "typewriter-animation",
    Marquee: "marquee",
    FlickerText: "flicker-text",
    Card: "card",
    Badge: "badge",
    Title: "title",
    Stats: "stats",
    Stat: "stat",
    StatValue: "stat-value",
    StatLabel: "stat-label",
    Rainbow: "rainbow",
    Raincon: "raincon",
    Rainbow_grad: "rainbow_grad"
} as const;

export type SolCSSType = keyof typeof SolCSS;
