import '../gen.css'

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
    MarqueeChild: "MarqueeChild",
    FlickerText: "FlickerText",
    Card: "card",
    Title: "title",
    Description: "description",
    Stats: "stats",
    Stat: "stat",
    StatValue: "stat-value",
    StatLabel: "stat-label",
    Rainbow: "Rainbow",
    Raincon: "Raincon",
    RainconGrad: "RainconGrad",

    varGhostColor: "--ghostColor",
    varGhostEyeColor: "--ghostEyeColor",
    varGhostWaveColor: "--ghostWaveColor",
    varGhostCircleRadius: "--ghostCircleRadius",
    varGhostCircleSize: "--ghostCircleSize",
    varGhostCircleDistance: "--ghostCircleDistance",
    varFlickerShadow: "--flicker-shadow",
    varRainsrc: "--rainsrc",
    varRainsize: "--rainsize"

    
} as const;

export type CssFANCYType = keyof typeof CssFANCY;
