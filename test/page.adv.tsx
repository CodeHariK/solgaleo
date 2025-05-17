import { createSignal } from "solid-js";
import { RichText, BlogList, Carousel, Markdown, Slides, SuperTable, Carousel3D, TabBar, HList } from "../src/adv/gen";
import { IconCross, IconTableHeading } from "../src/svg/gen";
import { CssUI, GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

/*CSS:

.blog-title {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: var(--blog-title-color);
    display: inline-block;
    position: relative;
    margin-bottom: .7rem;
}

.blog-item:hover .blog-title {
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-underline-offset: .4rem;
    text-decoration-color: var(--primary);
}

.blog-meta {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: .4em;
    margin: 4px 0;
}

*/

export function AdvTest() {

    let [currentTab, setCurrentTab] = createSignal(0)

    return <GridLayout
        mode="flow"
        header={<TestHeader />}
        footer={<TestHeader />}
    >

        <TabBar
            titles={["Font", "Display", "Grid", "Tip"]}
            tabBarStyle={{ "justify-content": "center" }}
            pagination={{ totalItems: 10, itemsPerPage: 4 }}
            onTabChange={(i) => { setCurrentTab(i) }} />
        <TabBar
            titles={["Font", "Display", "Grid", "Tip"]}
            onTabChange={(i) => { setCurrentTab(i) }} />
        <HList titles={["Font", "Display", "Grid", "Tip"]} index={currentTab} />

        <Carousel3D items={[
            <h2>Item 1</h2>,
            <h2>Item 2</h2>,
            <h2>Item 3</h2>,
            <h2>Item 4</h2>,
        ]} />

        <Carousel />

        <Slides />

        <div style={{ "max-height": "800px", overflow: "scroll" }}>
            <RichText />
        </div>

        <BlogList
            id="sol"
            blogs={[
                1, 2, 3, 4, 5, 6, 7, 8, 9
            ].map((i) => {
                let title = "SolidJS-" + i
                return {
                    title: title,
                    element:
                        <>
                            <a href={`#${title}`}><h2>{title}</h2></a>
                            <div class="blog-meta">
                            </div>
                            <p class="description">
                                s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                        </>

                }
            })} />

        <SuperTableTest />

        <MarkdownTest />

    </GridLayout>
}

//FN:START
//SuperTable : Table with sticky header
//FN:DOC
export function SuperTableTest() {
    return <SuperTable

        tableStyle={{
            "max-height": "300px",
            "overflow-y": "scroll",
            margin: "10px 0px",
        }}

        style={{
            margin: "10px",
            padding: "15px",
            width: "90%",
            "box-shadow": "rgba(0, 0, 0, 0.1) 0px 0px 6px 2px",
        }}

        tableArray={["#eedbf7", "#ffd5ca", "#d3fcdd",].map((tableHeaderColor) => {
            return {
                headerItems: [
                    <><p>User Agent </p><IconTableHeading /></>,
                    <><p>Started </p><IconTableHeading /></>,
                    <><p>Active </p><IconTableHeading /></>,
                    <><p>Valid </p><IconTableHeading /></>,
                    <>Revoke</>,
                ],
                rowStyle: {
                    "grid-template-columns": `1fr 2fr 1fr 1fr 1fr`
                },
                headerStyle: {
                    "grid-template-columns": `1fr 2fr 1fr 1fr 1fr`,
                },
                headerCellStyle: () => {
                    return {
                        margin: ".1rem",
                        padding: "10px",
                        background: tableHeaderColor,
                    };
                },
                rowCellStyle: (row, col) => {
                    return {
                        padding: "10px",
                        margin: ".1rem",
                        background: (col == 1 || row == 1) ? tableHeaderColor : ""
                    };
                },
                data: [
                    { agent: "Hello", iat: 1744696177, exp: 1744696177 },
                    { agent: "Hello", iat: 1744696177, exp: 1744696177 },
                    { agent: "Hello", iat: 1744696177, exp: 1744696177 },
                    { agent: "Hello", iat: 1744696177, exp: 1744696177 },
                    { agent: "Hello", iat: 1744696177, exp: 1744696177 },
                    { agent: "Hello", iat: 1744696177, exp: 1744696177 },
                ].map((s, _i) => {
                    return {
                        // info: <p>`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the `</p>,
                        hiddenDetails: <div>More info...</div>,

                        rowItems: [
                            <p>{s.agent}</p>,

                            <p>{(() => {
                                let d = new Date(Number(s.iat) * 1000);
                                return d.toLocaleDateString() + " (" + d.toLocaleTimeString() + ")";
                            })()}</p>,
                            <p>Active</p>,
                            <p>{s.exp.toString()}</p>,
                            <button class={CssUI.IconButton}><IconCross /></button>
                        ]
                    };
                }
                )
            };
        })}

        headerstart={<div>
            <h3>Login sessions</h3>
        </div>}
        headerend={<div class="flex gap2">
            <button class={CssUI.OutlinedButton}>Revoke All</button>
            <button class={CssUI.MaterialButton}>Logout</button>
        </div>}
        footerstart={<p>Page 1 of 10</p>}
        footerend={<div class="flex gap2">
            <button class={CssUI.MaterialButton}>Previous</button>
            <button class={CssUI.MaterialButton}>Next</button>
        </div>}
    ></SuperTable>;
}
//FN:END

//FN:START
//2.Markdown : Simple Markdown renderer
//FN:DOC
export function MarkdownTest() {
    return <Markdown content='
# Bloom filter 

--

1. Hello
2. Hi
    3. [Wikipedia](https://en.wikipedia.org/wiki/Bloom_filter)

* [Wikipedia](https://en.wikipedia.org/wiki/Bloom_filter)
    * Hello
    * Hi
        * Sol
* [mCoding : Bloom Filters](https://www.youtube.com/watch?v=qZNJTh2NEiU)
* [Number0 : Bloom Filters](https://www.youtube.com/watch?v=eCUm4U3WDpM)
* [ByteByteGo : Bloom Filters](https://www.youtube.com/watch?v=V3pzxngeLqw)
* [Spanning Tree : What Are Bloom Filters?](https://www.youtube.com/watch?v=kfFacplFY4Y)
* [ByteMonk : Bloom Filters](https://www.youtube.com/watch?v=GT0En1dGntY)

Bloom filter is a space-efficient probabilistic data structure, that is used to test whether an element is a member of a set. False positive matches are possible, but false negatives are not - in other words, a query returns either "possibly in set" or "definitely not in set". Elements can be added to the set, but not removed.

## Uses

### Cache filtering {#cache-filtering}

Regular paragraph with an ![inline image](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1903340/ss_483a27df5072beb3a4650634a764bda750fbcb82.1920x1080.jpg?t=1745509513) in the middle.

[![IMAGE ALT TEXT HERE](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1903340/ss_483a27df5072beb3a4650634a764bda750fbcb82.1920x1080.jpg?t=1745509513)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

![Standalone image](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1903340/ss_483a27df5072beb3a4650634a764bda750fbcb82.1920x1080.jpg?t=1745509513)

* List item with ![embedded image](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1903340/ss_483a27df5072beb3a4650634a764bda750fbcb82.1920x1080.jpg?t=1745509513) inside it
    * Nested list with image ![nested](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1903340/ss_483a27df5072beb3a4650634a764bda750fbcb82.1920x1080.jpg?t=1745509513)

<iframe width="951" height="535" src="https://www.youtube.com/embed/ltK_AhiXGDU" title="Clair Obscur: Expedition 33 - Official Trailer | Galaxies Gaming Showcase 2025" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    # Title
        ## Subtitle
### Smaller Title
    **Hello**, 
this is _italic_, 

and a [link](https://example.com)

### Pacman Update Commands
sudo pacman -Sy    # Sync package databases

```go
    ### Pacman Update Commands
    sudo pacman -Sy    # Sync package databases

    import (
        "io",
        "os",
        "fmt"
    )

    func main(){
        fmt.Println("Hello")
    }
```'
    />
}
//FN:END
