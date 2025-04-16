import { BlogList, MiniMarkdown, Stepper, SuperTable, Treeview } from "../src/adv/gen";
import { IconCross, IconTableHeading } from "../src/svg/gen";
import { CssUI, GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

export function AdvTest() {
    return <GridLayout
        header={<TestHeader />}
    >

        <SuperTable

            tableStyle={{
                "max-height": "300px",
                "overflow-y": "scroll",
                margin: "10px 0px",
            }}

            style={{
                margin: "10px",
                padding: "15px",
                background: "var(--surface)",
                width: "90%",
                "box-shadow": "rgba(0, 0, 0, 0.1) 0px 0px 6px 2px",
            }}

            tableArray={["#a550d3", "#d75d3c", "#41a358",].map((tableHeaderColor) => {
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
                        }
                    },
                    rowCellStyle: (row, col) => {
                        return {
                            padding: "10px",
                            margin: ".1rem",
                            background: (col == 1 || row == 1) ? tableHeaderColor : ""
                        }
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
                                    let d = new Date(Number(s.iat) * 1000)
                                    return d.toLocaleDateString() + " (" + d.toLocaleTimeString() + ")"
                                })()}</p>,
                                <p>Active</p>,
                                <p>{s.exp.toString()}</p>,
                                <button class={CssUI.IconButton}><IconCross /></button>
                            ]
                        }
                    }
                    )
                }
            })}

            headerstart={<div>
                <h3>Login sessions</h3>
            </div>}
            headerend={
                <div class="flex gap2">
                    <button class={CssUI.OutlinedButton}>Revoke All</button>
                    <button class={CssUI.MaterialButton}>Logout</button>
                </div>
            }
            footerstart={
                <p>Page 1 of 10</p>
            }
            footerend={
                <div class="flex gap2">
                    <button class={CssUI.MaterialButton}>Previous</button>
                    <button class={CssUI.MaterialButton}>Next</button>
                </div>
            }
        ></SuperTable>

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