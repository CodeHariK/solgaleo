import '../gen.css'
import "./gen.css"
export * from "./banner.tsx";
export * from "./ghost.tsx";
export * from "./terminal.tsx";
export * from "./marquee.tsx";
export * from "./flicker.tsx";
export * from "./glittercard.tsx";
export * from "./rainbow.tsx";
export * from "./transition.tsx";


export const CssFANCY = {
    Banner: "banner",
    Ghost: "ghost",
    Ghost__eyes: "ghost__eyes",
    Ghost__eyes_eye: "ghost__eyes_eye",
    Ghost__waves: "ghost__waves",
    Ghost__wave: "ghost__wave",
    Ghost__mouth: "ghost__mouth",
    Active: "active",
    Typewriter: "Typewriter",
    TerminalWindow: "TerminalWindow",
    TerminalHeader: "TerminalHeader",
    TerminalLine: "TerminalLine",
    Marquee: "Marquee",
    SFlickerText: "SFlickerText",
    Card: "card",
    Badge: "badge",
    Title: "title",
    Stats: "stats",
    Stat: "stat",
    StatValue: "stat-value",
    StatLabel: "stat-label",
    Rainbow: "Rainbow",
    Raincon: "Raincon",
    RainconGrad: "RainconGrad",
    TransitionContainer: "TransitionContainer",
    TransitionItem: "TransitionItem",
    TransitionEnter: "TransitionEnter",
    TransitionEnterActive: "TransitionEnterActive",
    TransitionExit: "TransitionExit",
    TransitionExitActive: "TransitionExitActive",

    varBannerBorder: "--banner-border",
    varBannerBg: "--banner-bg",
    varGhostColor: "--ghostColor",
    varWaveColor: "--waveColor",
    varR: "--R",
    varSize: "--size",
    varP: "--p",
    varStermBorderColor: "--sterm-border-color",
    varStermBgColor: "--sterm-bg-color",
    varFlickerShadow: "--flicker-shadow",
    varSFlickerTextCol: "--SFlickerText-col",
    varRainsrc: "--rainsrc",
    varRainsize: "--rainsize"
} as const;

export type CssFANCYType = keyof typeof CssFANCY;
