
import "./gen.css"
export * from "./page.fancy.tsx";
export * from "./page.nav.tsx";
export * from "./page.adv.tsx";
export * from "./page.grid.tsx";
export * from "./page.tabs.tsx";
export * from "./page.svg.tsx";
export * from "./common.tsx";
export * from "./NotFound.tsx";
export * from "./page.ui.tsx";


export const CssTEST = {
    BlogTitle: "blog-title",
    BlogItem: "blog-item",
    BlogMeta: "blog-meta",
    IconGrid: "IconGrid",
    IconItem: "IconItem",
    IconLabel: "IconLabel",
    ListContainer: "ListContainer",
    List: "List",
    ListItem: "ListItem",
    Dom: "dom",
    Box: "box",
    S2g: "s2g",
    Stepper: "stepper",
    Marqu2ee: "marqu2ee",
    Typewri2terAnimation: "typewri2ter-animation",
    TabLe2vel: "tab-le2vel",
    TabLev2el: "tab-lev2el",
    FlickerText: "flicker-text",
    Glitter: "Glitter",
    AppTextInput: "AppTextInput",
    Potato: "potato",

    varBlogTitleColor: "--blog-title-color",
    varPrimary: "--primary",
    varVisibility: "--visibility",
    varSvgRingWidth: "--svg-ring-width",
    varSvgRingColor: "--svg-ring-color",
    varMarqueeWidth: "--marquee-width",
    varKeyframesMarqu2ee100Height: "--keyframes-marqu2ee-100-height",
    varKeyframesMarqu2ee100Col: "--keyframes-marqu2ee-100-col",
    varMarqueeFontColor: "--marquee-font-color",
    varMarqueeSpanBg: "--marquee-span-bg",
    varNeonPink: "--neon-pink",
    varInputPlaceholder: "--input-placeholder",
    varDomDecoration: "--dom-decoration",
    varDomBorder: "--dom-border",
    varDomDisplay: "--dom-display",
    varBoxDomBgHover: "--box-dom-bg-hover",
    varBoxDomColHover: "--box-dom-col-hover",
    varBoxHello: "--box-hello",
    varBoxHi: "--box-hi",
    varBoxAlola: "--box-alola",
    varSvgRingBg: "--svg-ring-bg",
    varS2gBackgroundColor: "--s2g-background-color",
    varHell2oCol: "--hell2o-col",
    varHelloStepperCol: "--hello--stepper-col",
    varMarqu2eeSpanCol: "--marqu2ee-span-col",
    varFieldfontCol: "--fieldfont-col"
} as const;

export type CssTESTType = keyof typeof CssTEST;
