
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
    BlogMeta: "blog-meta",
    CodeCard: "CodeCard",
    Light: "light",
    Night: "night",
    LanguageCss: "language-css",
    LanguageJavascript: "language-javascript",
    LanguageJson: "language-json",
    LanguageMarkdown: "language-markdown",
    LineNumbersRows: "line-numbers-rows",
    CommandLine: "command-line",
    CommandLinePrompt: "command-line-prompt",
    LineNumbers: "line-numbers",
    IconGrid: "IconGrid",
    IconItem: "IconItem",
    IconLabel: "IconLabel",
    Box: "box",
    Stepper: "stepper",

    varBoxDomHover: "--box-dom-hover",
    varSvgRingColor: "--svg-ring-color",
    varHelloSpan: "--hello-span",
    varMarkAnimCol: "--mark-anim-col",
    varBoxHello: "--box-hello",
    varBoxHi: "--box-hi",
    varDomDecoration: "--dom-decoration",
    varDomBorder: "--dom-border",
    varSvgRingWidth: "--svg-ring-width",
    varHelloSpanBg: "--hello-span-bg",
    varMarqueeWidth: "--marquee-width",
    varMarkAnimHeight: "--mark-anim-height"

    ,Docs: [
        {
            element: test_page_root_tsx.Hello, 
            doc: "Hello", 
            data: "export function Hello() {\n\treturn <div class=\"flex flex-col items-center h-full\">\n\n\t\t<RainbowImage style={{ margin: \"2rem\" }} size=\"200px\" src=\"/solgaleo/logo.png\" />\n\n\t\t<Marquee repeatCount={8} child={() => <RainbowText style={{ \"font-size\": \"3rem\", }} class=\"p2 border-basic\" >\n\t\t\tSOLGALEO\n\t\t</RainbowText>} />\n\n\t\t<Marquee repeatCount={8} child={() =>\n\t\t\t<div class=\"border-basic p2\">\n\t\t\t\tHello how are you\n\t\t\t</div>\n\t\t} />\n\t</div >\n}"
        },
        {
            element: test_page_fancy_tsx.BannerTest, 
            doc: "Banner", 
            data: "export function BannerTest() {\n  return <Banner title=\"Tip\"\n    info=\"Although most developers will stick to just one UI framework, Rocket supports multiple frameworks in the same project. This allows you to:\"\n  >\n    <ol>\n      <li>Choose the framework that is best for each component.\n        <ol>\n          <li>Nested item 1</li>\n          <li>Nested item 2</li>\n        </ol>\n        ii  </li>\n      <li>Learn a new framework without needing to start a new project.</li>\n      <li>Collaborate with others even when working in different frameworks.</li>\n      <li>Incrementally convert an existing site to another framework with no downtime.</li>\n    </ol>\n  </Banner>;\n}"
        },
        {
            element: test_page_nav_tsx.BreadcrumbTest, 
            doc: "Breadcrumb", 
            data: "export function BreadcrumbTest() {\n  return <N.Breadcrumbs items={[\n    {\n      element: <IconHome />,\n      link: \"/\",\n      fn: () => console.log(\"Hello\")\n    },\n    {\n      element: <span>Products</span>,\n      link: \"/products\"\n    },\n    {\n      element: <span>Category</span>\n    }\n  ]} />;\n}"
        },
        {
            element: test_page_ui_tsx.ButtonTest, 
            doc: "Buttons", 
            data: "export function ButtonTest(setProgress?: (progress: number) => void) {\n  return <div style={{ \"display\": \"flex\", \"align-items\": \"center\", \"flex-wrap\": \"wrap\" }}>\n\n    <button>BaseButton</button>\n\n    <button class={CssUI.MaterialButton}>MaterialButton</button>\n\n    <button class={CssUI.OutlinedButton}>OutlinedButton</button>\n\n    <button class={CssUI.IconButton} onClick={() => {\n      setProgress?.(80);\n    }}><IconHome /></button>\n\n    <AsyncButton onClick={async (): Promise<void> => {\n      // Simulate an async operation (e.g., API call)\n      return new Promise((resolve, reject) => {\n        setTimeout(() => {\n          const shouldFail = Math.random() < 0.5; // 50% chance to fail\n          if (shouldFail) {\n            reject(new Error(\"Something went wrong!\"));\n          } else {\n            resolve(); // Resolve without returning a value\n          }\n        }, 2000);\n      });\n    }}>\n      Click Me\n    </AsyncButton>\n  </div>;\n}"
        },
        {
            element: test_page_grid_tsx.FixedAll3, 
            doc: "GridLayout : Standard layouts", 
            data: "export function FixedAll3() {\n  return <GridLayout\n    header={<TestHeader />}\n    left={<TestVCarousel />}\n    right={<TestVCarousel />}\n  >\n    <TestVCarousel />\n  </GridLayout>\n}"
        },
        {
            element: test_NotFound_tsx.NotFound, 
            doc: "Ghost", 
            data: "export function NotFound() {\n   return (\n    <GridLayout\n     title='Page Not Found'\n     header={<TestHeader />}\n    >\n     <div class=\"flex flex-col justify-center items-center gap8 h-full\">\n      <h1>404 - Page Not Found</h1>\n      <a title=\"Return to Home\" href=\".\">\n         <RainbowText>Return to Home</RainbowText>\n      </a>\n\n      <GhostComponent\n         ghostColor=\"#3a3a3a4d\"\n         waveColor=\"#8c2ec26c\"\n         eyeColor='#f8474787'\n      />\n\n     </div>\n    </GridLayout>\n   );\n}"
        },
        {
            element: test_common_tsx.TestHeader, 
            doc: "Header", 
            data: "export function TestHeader() {\n  return <Header\n    title={<AA href=\"/\">\n      <IMG src=\"/logo.png\" alt=\"solgaleo\" />\n      <p>Solgaleo</p>\n    </AA>}\n    links={[\n      <AA href={'/nav'} title='Nav'>Nav</AA>,\n      <AA href={'/adv'} title='Adv' >Adv</AA>,\n      <AA href={'/svg'} title='Svg' >Svg</AA>,\n      <AA href={'/fancy'} title='Fancy' >Fancy</AA>,\n      <AA href={'/ui'} title='Ui' >Ui</AA>,\n      <AA href={'/grid'} title='Grid'>Grid</AA>,\n      <AA href=\"/tabs\" >Tab</AA>,\n      <AA href=\"/tabs?two.light=Root.Pictures.Vacation\" >Tabs</AA>,\n    ]}\n    right={[\n      <button\n        class={CssUI.IconButton}\n        type=\"button\"\n        onClick={() => window.open('https://github.com/codeharik/solgaleo', '_blank')}>\n        Github\n      </button>,\n      <ThemeToggle />\n    ]}\n  />;\n}"
        },
        {
            element: test_page_adv_tsx.MarkdownTest, 
            doc: "MiniMarkdown : Simple Markdown renderer", 
            data: "export function MarkdownTest() {\n  return <MiniMarkdown content=\"\n  # Title\n    ## Subtitle\n### Smaller Title\n  **Hello**, \nthis is _italic_, \n\nand a [link](https://example.com)\n\n### Pacman Update Commands\nsudo pacman -Sy  # Sync package databases\n\n```go\n  ### Pacman Update Commands\n  sudo pacman -Sy  # Sync package databases\n\n  import (\n    'io',\n    'os',\n    'fmt'\n  )\n\n  func main(){\n    fmt.Println('Hello')\n  }\n```\"\n  />\n}"
        },
        {
            element: test_page_adv_tsx.SuperTableTest, 
            doc: "SuperTable : Table with sticky header", 
            data: "export function SuperTableTest() {\n  return <SuperTable\n\n    tableStyle={{\n      \"max-height\": \"300px\",\n      \"overflow-y\": \"scroll\",\n      margin: \"10px 0px\",\n    }}\n\n    style={{\n      margin: \"10px\",\n      padding: \"15px\",\n      width: \"90%\",\n      \"box-shadow\": \"rgba(0, 0, 0, 0.1) 0px 0px 6px 2px\",\n    }}\n\n    tableArray={[\"#eedbf7\", \"#ffd5ca\", \"#d3fcdd\",].map((tableHeaderColor) => {\n      return {\n        headerItems: [\n          <><p>User Agent </p><IconTableHeading /></>,\n          <><p>Started </p><IconTableHeading /></>,\n          <><p>Active </p><IconTableHeading /></>,\n          <><p>Valid </p><IconTableHeading /></>,\n          <>Revoke</>,\n        ],\n        rowStyle: {\n          \"grid-template-columns\": `1fr 2fr 1fr 1fr 1fr`\n        },\n        headerStyle: {\n          \"grid-template-columns\": `1fr 2fr 1fr 1fr 1fr`,\n        },\n        headerCellStyle: () => {\n          return {\n            margin: \".1rem\",\n            padding: \"10px\",\n            background: tableHeaderColor,\n          };\n        },\n        rowCellStyle: (row, col) => {\n          return {\n            padding: \"10px\",\n            margin: \".1rem\",\n            background: (col == 1 || row == 1) ? tableHeaderColor : \"\"\n          };\n        },\n        data: [\n          { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n          { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n          { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n          { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n          { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n          { agent: \"Hello\", iat: 1744696177, exp: 1744696177 },\n        ].map((s, _i) => {\n          return {\n            // info: <p>`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the `</p>,\n            hiddenDetails: <div>More info about John Doe...</div>,\n\n            rowItems: [\n              <p>{s.agent}</p>,\n\n              <p>{(() => {\n                let d = new Date(Number(s.iat) * 1000);\n                return d.toLocaleDateString() + \" (\" + d.toLocaleTimeString() + \")\";\n              })()}</p>,\n              <p>Active</p>,\n              <p>{s.exp.toString()}</p>,\n              <button class={CssUI.IconButton}><IconCross /></button>\n            ]\n          };\n        }\n        )\n      };\n    })}\n\n    headerstart={<div>\n      <h3>Login sessions</h3>\n    </div>}\n    headerend={<div class=\"flex gap2\">\n      <button class={CssUI.OutlinedButton}>Revoke All</button>\n      <button class={CssUI.MaterialButton}>Logout</button>\n    </div>}\n    footerstart={<p>Page 1 of 10</p>}\n    footerend={<div class=\"flex gap2\">\n      <button class={CssUI.MaterialButton}>Previous</button>\n      <button class={CssUI.MaterialButton}>Next</button>\n    </div>}\n  ></SuperTable>;\n}"
        },
        {
            element: test_page_svg_tsx.tSvg, 
            doc: "Svg", 
            data: "export function tSvg() {\n  return <div class={CssTEST.IconGrid}>\n    {icons.map(({ component: Icon, name }) => (\n      <div class={CssTEST.IconItem}>\n        <Icon style={{ width: \"4rem\", height: \"4rem\" }} />\n        <span class={CssTEST.IconLabel}>{name}</span>\n      </div>\n    ))}\n  </div>\n\n}"
        },
        {
            element: test_page_tabs_tsx.TestTreeView, 
            doc: "TreeView", 
            data: "export function TestTreeView() {\n  return <Treeview\n    tabsData={sampleTabData()}\n    onClick={(node) => {\n      console.log(\"Leaf clicked:\", node);\n    }} />;\n}"
        },
        {
            element: test_page_grid_tsx.TestVCarousel, 
            doc: "VCarousel : Vertical carousel list", 
            data: "export function TestVCarousel() {\n  return <VCarousel children={[\n    \"one\",\n    \"two\",\n    \"three\",\n    \"four\",\n    \"five\",\n    \"six\",\n    \"seven\",\n    \"nine\",\n    \"ten\",\n  ]}\n    itemStyle={{\n      background: \"var(--primary-container)\",\n      padding: \"10px\",\n      \"border-radius\": \"1rem\",\n      height: \"400px\",\n      \"text-align\": 'center',\n      \"align-content\": 'center'\n    }}\n    listStyle={{ padding: \"10px\" }} />\n}"
        }
    ]
} as const;

export type CssTESTType = keyof typeof CssTEST;
