import { BlogList, MiniMarkdown, Stepper, SuperTable, Treeview } from "../src/adv/gen";

export function AdvTest() {
    return <>

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

        <SuperTable table={{
            heading: [
                <p>Hello</p>, <p>Hi</p>,
            ],
            rows: [
                [<p>1</p>, <p>2</p>,],
                [<p>A</p>, <p>B</p>,]
            ]
        }} />

    </>
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