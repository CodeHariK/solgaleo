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
    GhostCon: "GhostCon",
    Ghost: "ghost",
    GhostEyes: "GhostEyes",
    GhostEye: "GhostEye",
    GhostWaves: "GhostWaves",
    GhostWave: "GhostWave",
    GhostMouth: "GhostMouth",
    Typewriter: "Typewriter",
    TerminalWindow: "TerminalWindow",
    TerminalHeader: "TerminalHeader",
    TerminalLine: "TerminalLine",
    Marquee: "Marquee",
    FlickerText: "FlickerText",
    Card: "card",
    Title: "title",
    Stats: "stats",
    Stat: "stat",
    StatValue: "stat-value",
    StatLabel: "stat-label",
    Rainbow: "Rainbow",
    Raincon: "Raincon",
    RainconGrad: "RainconGrad",

    varSurface: "--surface",
    varPrimary: "--primary",
    varBannerBorder: "--banner-border",
    varSecondary: "--secondary",
    varPrimaryContainer: "--primary-container",
    varGhostColor: "--ghostColor",
    varGhostEyeColor: "--ghostEyeColor",
    varGhostWaveColor: "--ghostWaveColor",
    varGhostCircleRadius: "--ghostCircleRadius",
    varGhostCircleSize: "--ghostCircleSize",
    varGhostCircleDistance: "--ghostCircleDistance",
    varStermBorderColor: "--sterm-border-color",
    varStermBgColor: "--sterm-bg-color",
    varFlickerShadow: "--flicker-shadow",
    varFlickerTextCol: "--FlickerText-col",
    varSecondaryContainer: "--secondary-container",
    varRainsrc: "--rainsrc",
    varRainsize: "--rainsize"
} as const;

export type CssFANCYType = keyof typeof CssFANCY;
