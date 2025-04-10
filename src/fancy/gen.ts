import '../gen.css'
import "./gen.css"
export * from "./banner.tsx";
export * from "./ghost.tsx";
export * from "./terminal.tsx";
export * from "./marquee.tsx";
export * from "./flicker.tsx";
export * from "./glittercard.tsx";
export * from "./rainbow.tsx";


export const CssFANCY = {
    Banner: "banner",
    Ghost: "ghost",
    Ghost__eyes: "ghost__eyes",
    Ghost__eyes_eye: "ghost__eyes_eye",
    Ghost__waves: "ghost__waves",
    Ghost__wave: "ghost__wave",
    Ghost__mouth: "ghost__mouth",
    Active: "active",
    STypewriter: "STypewriter",
    STerminalWindow: "STerminalWindow",
    STerminalHeader: "STerminalHeader",
    STerminalLine: "STerminalLine",
    SMarquee: "SMarquee",
    SFlickerText: "SFlickerText",
    Card: "card",
    Badge: "badge",
    Title: "title",
    Stats: "stats",
    Stat: "stat",
    StatValue: "stat-value",
    StatLabel: "stat-label",
    SRainbow: "SRainbow",
    SRaincon: "SRaincon",
    SRainconGrad: "SRainconGrad",

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
