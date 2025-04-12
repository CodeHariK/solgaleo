
import "./gen.css"
export * from "./page.fancy.tsx";
export * from "./modal1.tsx";
export * from "./page.nav.tsx";
export * from "./page.adv.tsx";
export * from "./storybook.tsx";
export * from "./page.grid.tsx";
export * from "./page.tabs.tsx";
export * from "./page.svg.tsx";
export * from "./common.tsx";
export * from "./NotFound.tsx";
export * from "./page.ui.tsx";


export const CssTEST = {
    IconGrid: "IconGrid",
    IconItem: "IconItem",
    IconLabel: "IconLabel",
    ListContainer: "ListContainer",
    List: "List",
    ListItem: "ListItem",
    Stepper: "stepper",
    Box: "box",
    Svg: "svg",
    Marquee: "marquee",
    TypewriterAnimation: "typewriter-animation",
    TabLevel: "tab-level",
    FlickerText: "flicker-text",
    Glitter: "Glitter",
    AppTextInput: "AppTextInput",
    Potato: "potato",

    varVisibility: "--visibility",
    varSvgRingWidth: "--svg-ring-width",
    varSvgRingColor: "--svg-ring-color",
    varMarqueeWidth: "--marquee-width",
    varKeyframesMarquee100Height: "--keyframes-marquee-100-height",
    varKeyframesMarquee100Col: "--keyframes-marquee-100-col",
    varMarqueeFontColor: "--marquee-font-color",
    varMarqueeSpanBg: "--marquee-span-bg",
    varNeonPink: "--neon-pink",
    varInputPlaceholder: "--input-placeholder",
    varStepperDecoration: "--stepper-decoration",
    varStepperBorder: "--stepper-border",
    varStepperDisplay: "--stepper-display",
    varBoxStepperBgHover: "--box-stepper-bg-hover",
    varBoxStepperColHover: "--box-stepper-col-hover",
    varBoxHello: "--box-hello",
    varBoxHi: "--box-hi",
    varBoxAlola: "--box-alola",
    varSvgRingBg: "--svg-ring-bg",
    varSvgBackgroundColor: "--svg-background-color",
    varHelloCol: "--hello-col",
    varHelloStepperCol: "--hello--stepper-col",
    varMarqueeSpanCol: "--marquee-span-col",
    varPCol: "--p-col"
} as const;

export type CssTESTType = keyof typeof CssTEST;
