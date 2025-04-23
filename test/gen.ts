
import "./gen.css"
export * from "./page.fancy.tsx"; import * as test_page_fancy_tsx from "./page.fancy.tsx";
export * from "./page.nav.tsx"; import * as test_page_nav_tsx from "./page.nav.tsx";
export * from "./page.adv.tsx"; import * as test_page_adv_tsx from "./page.adv.tsx";
export * from "./page.root.tsx"; import * as test_page_root_tsx from "./page.root.tsx";
export * from "./page.grid.tsx"; import * as test_page_grid_tsx from "./page.grid.tsx";
export * from "./page.tabs.tsx"; import * as test_page_tabs_tsx from "./page.tabs.tsx";
export * from "./page.svg.tsx"; import * as test_page_svg_tsx from "./page.svg.tsx";
export * from "./common.tsx"; import * as test_common_tsx from "./common.tsx";
export * from "./NotFound.tsx"; import * as test_NotFound_tsx from "./NotFound.tsx";
export * from "./page.ui.tsx"; import * as test_page_ui_tsx from "./page.ui.tsx";


export const CssTEST = {
    BlogTitle: "blog-title",
    BlogItem: "blog-item",
    BlogMeta: "blog-meta",
    CodeCard: "CodeCard",
    IconGrid: "IconGrid",
    IconItem: "IconItem",
    IconLabel: "IconLabel",
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
    varFieldfontCol: "--fieldfont-col",

    Docs: [
        {
            element: test_page_adv_tsx.SuperTableTest, 
            doc: "SuperTable : Table with sticky header", 
            data: "export function SuperTableTest() {\n    return <SuperTable\n\n        tableStyle={{\n            \"max-height\": \"300px\",\n            \"overflow-y\": \"scroll\",\n            margin: \"10px 0px\",\n        }}\n\n        style={{\n            margin: \"10px\",\n            padding: \"15px\",\n            width: \"90%\",\n            \"box-shadow\": \"rgba(0, 0, 0, 0.1) 0px 0px 6px 2px\",\n        }}\n\n        tableArray={[\"#a550d3\", \"#d75d3c\", \"#41a358\",].map((tableHeaderColor) => {\n            return {\n                headerItems: [\n                    <><p>User Agent </p><IconTableHeading /></>,\n                    <><p>Started </p><IconTableHeading /></>,\n                    <><p>Active </p><IconTableHeading /></>,\n                    <><p>Valid </p><IconTableHeading /></>,\n                    <>Revoke</>,\n                ],\n                rowStyle: {\n                    \"grid-template-columns\": `1fr 2fr 1fr 1fr 1fr`\n                },\n                headerStyle: {\n                    \"grid-template-columns\": `1fr 2fr 1fr 1fr 1fr`,\n                },\n                headerCellStyle: () => {\n                    return {\n                        margin: \".1rem\",\n                        padding: \"10px\",\n                        background: tableHeaderColor,\n                    };\n                },\n                rowCellStyle: (row, col) => {\n                    return {\n                        padding: \"10px\",\n                        margin: \".1rem\",\n                        background: (col == 1 || row == 1) ? tableHeaderColor : \"\"\n                    };\n                },\n                data: [\n                    { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n                    { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n                    { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n                    { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n                    { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n                    { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n                ].map((s, _i) => {\n                    return {\n                        // info: <p>`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the `</p>,\n                        hiddenDetails: <div>More info about John Doe...</div>,\n\n                        rowItems: [\n                            <p>{s.agent}</p>,\n\n                            <p>{(() => {\n                                let d = new Date(Number(s.iat) * 1000);\n                                return d.toLocaleDateString() + \" (\" + d.toLocaleTimeString() + \")\";\n                            })()}</p>,\n                            <p>Active</p>,\n                            <p>{s.exp.toString()}</p>,\n                            <button class={CssUI.IconButton}><IconCross /></button>\n                        ]\n                    };\n                }\n                )\n            };\n        })}\n\n        headerstart={<div>\n            <h3>Login sessions</h3>\n        </div>}\n        headerend={<div class=\"flex gap2\">\n            <button class={CssUI.OutlinedButton}>Revoke All</button>\n            <button class={CssUI.MaterialButton}>Logout</button>\n        </div>}\n        footerstart={<p>Page 1 of 10</p>}\n        footerend={<div class=\"flex gap2\">\n            <button class={CssUI.MaterialButton}>Previous</button>\n            <button class={CssUI.MaterialButton}>Next</button>\n        </div>}\n    ></SuperTable>;\n}"
        },
        {
            element: test_page_adv_tsx.MarkdownTest, 
            doc: "MiniMarkdown : Simple Markdown renderer", 
            data: "export function MarkdownTest() {\n    return <MiniMarkdown content=\"\n    # Title\n        ## Subtitle\n### Smaller Title\n    **Hello**, \nthis is _italic_, \n\nand a [link](https://example.com)\n\n### Pacman Update Commands\nsudo pacman -Sy    # Sync package databases\n\n```go\n    ### Pacman Update Commands\n    sudo pacman -Sy    # Sync package databases\n\n    import (\n        'io',\n        'os',\n        'fmt'\n    )\n\n    func main(){\n        fmt.Println('Hello')\n    }\n```\"\n    />\n}"
        }
    ]
} as const;

export type CssTESTType = keyof typeof CssTEST;
