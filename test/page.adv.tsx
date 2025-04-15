import { AccordionGrid, BlogList, MiniMarkdown, Stepper, SuperTable, Treeview } from "../src/adv/gen";
import { CssSRC } from "../src/gen";
import { IconCross, IconTableHeading } from "../src/svg/gen";
import { CssUI, GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

export function AdvTest() {
    return <GridLayout
        header={<TestHeader />}
    >

        <SuperTable
            table={{
                heading: [
                    <p>Hello</p>, <p>Hi</p>,
                ],
                rows: [
                    [<p>1</p>, <p>2</p>,],
                    [<p>A</p>, <p>B</p>,]
                ]
            }} />

        <SuperTable

            // style={{
            //     width: "60%",
            //     "box-shadow": "rgba(0, 0, 0, 0.1) 0px 0px 6px 2px",
            // }}

            table={{
                heading: [
                    <><p>User Agent </p><IconTableHeading /></>,
                    <><p>Started </p><IconTableHeading /></>,
                    <><p>Active </p><IconTableHeading /></>,
                    <><p>Valid </p><IconTableHeading /></>,
                    <>Revoke</>,
                ],
                rows: [
                    ...[
                        {
                            agent: "Hello",
                            iat: 1744696177,
                            exp: 1744696177,
                        },
                        {
                            agent: "Hello",
                            iat: 1744696177,
                            exp: 1744696177,
                        },
                        {
                            agent: "Hello",
                            iat: 1744696177,
                            exp: 1744696177,
                        },
                        {
                            agent: "Hello",
                            iat: 1744696177,
                            exp: 1744696177,
                        },
                    ].map((s, _i) =>
                        [
                            <p>{s.agent}</p>,

                            <p>{(() => {
                                let d = new Date(Number(s.iat) * 1000)
                                return d.toLocaleDateString() + " (" + d.toLocaleTimeString() + ")"
                            })()}</p>,
                            <p>Active</p>,
                            <p>{s.exp.toString()}</p>,
                            <button class={CssUI.IconButton}><IconCross /></button>
                        ]
                    ) ?? []
                ],
            }}
            headerstart={<div>
                <h3>Login sessions</h3>
            </div>}
            headerend={
                <div class="flex flex-row gap-2 shrink-0 sm:flex-row">
                    <button class={CssUI.OutlinedButton}>Revoke All</button>
                    <button class={CssUI.MaterialButton}>Logout</button>
                </div>
            }
            footerstart={
                <p>Page 1 of 10</p>
            }
            footerend={
                <div class="flex gap-1">
                    <button class={CssUI.MaterialButton}>Previous</button>
                    <button class={CssUI.MaterialButton}>Next</button>
                </div>
            }
        ></SuperTable>

        <AccordionGrid
            tableArray={

                ["red", "blue", "yellow", "green", "purple"].map((e) => {
                    return {
                        title: e,
                        rowStyle: {
                            "grid-template-columns": `4fr 1fr 1fr 1fr`
                        },
                        headerCellStyle: {
                            border: "1px solid blue",
                            margin: ".1rem"
                        },
                        headerStyle: {
                            background: `var(${CssSRC.varSurfaceContainer})`,
                            // padding: "10px",
                            "grid-template-columns": `4fr 1fr 1fr 1fr`,
                        },
                        cellStyle: {
                            padding: "10px",
                            border: "1px solid red",
                            margin: ".1rem",
                        },
                        headerItems: [

                            <><span>User</span><IconTableHeading /></>,
                            <><span>Age</span><IconTableHeading /></>,
                            <><span>Age</span><IconTableHeading /></>,
                            <div>Occupation</div>],
                        data:
                            [1, 2, 3].map((e, i) => {
                                return {
                                    // info: <p>`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the`</p>,
                                    hiddenDetails: <div>More info about John Doe...</div>,
                                    rowItems: [<div>{i}</div>, <div>Hello</div>, <div>Dev</div>, <div>Name</div>]
                                }
                            }),
                    }

                })

            } />

        <Treeview
            direction="vertical"
            defaultExpanded={true}
            data={sampleTreeData}
            onLeafClick={(node) => {
                console.log("Leaf clicked:", node);
            }}
        />

        <Treeview
            direction="horizontal"
            defaultExpanded={true}
            data={sampleTreeData}
            onLeafClick={(node) => {
                console.log("Leaf clicked:", node);
            }}
        />

        <MiniMarkdown content="
        # Title
            ## Subtitle
    ### Smaller Title
        **Hello**, 
    this is _italic_, 
    
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
    ```
    and a [link](https://example.com)"
        />

        <BlogList blogs={[
            {
                title: "Understanding SolidJS",
                tags: ["solidjs", "javascript"],
                description: "A deep dive into how SolidJS differs from React.",
                link: "#solidjs",
            },
            {
                title: "CSS Grid vs Flexbox",
                tags: ["css", "grid", "flexbox"],
                description: "Learn when to use CSS Grid and when Flexbox is better.",
                link: "#css-grid",
            },
        ]} />

        <Stepper items={
            [
                {
                    title: "Title",
                    subtitle: "Subtitle",
                    element: <div style={{ width: "100%", height: "30px", "background": "red" }}></div>
                },
                {
                    title: "Title",
                    subtitle: "Subtitle",
                    element: <div style={{ width: "100%", height: "30px", "background": "red" }}></div>
                },
            ]
        } />
    </GridLayout>
}

let sampleTreeData = [
    {
        id: '1',
        label: 'Root',
        children: [
            {
                id: '2',
                label: 'Documents',
                children: [
                    { id: '3', label: 'Report.pdf' },
                    { id: '4', label: 'Meeting Notes.txt' }
                ]
            },
            {
                id: '5',
                label: 'Pictures',
                children: [
                    { id: '6', label: 'Vacation.jpg' },
                    { id: '7', label: 'Family.png' }
                ]
            }
        ]
    }
]