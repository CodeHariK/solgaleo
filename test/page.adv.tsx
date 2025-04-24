import { BlogList, Carousel, MiniMarkdown, Slides, SuperTable } from "../src/adv/gen";
import { IconCross, IconTableHeading } from "../src/svg/gen";
import { CssUI, GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

/*CSS:*

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

    return <GridLayout
        mode="flow"
        header={<TestHeader />}
        footer={<TestHeader />}
    >

        <Carousel />

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

        <Slides />

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
                        hiddenDetails: <div>More info about John Doe...</div>,

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
//MiniMarkdown : Simple Markdown renderer
//FN:DOC
export function MarkdownTest() {
    return <MiniMarkdown content="
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
        'io',
        'os',
        'fmt'
    )

    func main(){
        fmt.Println('Hello')
    }
```"
    />
}
//FN:END
