import { Dropdown, TextInput, SpaceForm, CheckboxGroup, OutlinedButton, BaseButton, MaterialButton, IconButton, AllTheme, CartIcon, DownIcon, PositionBox, Breadcrumbs, Modal, RatingsBar, Footer, Header, ThemeToggle, SpaceLayout } from "../src/solgaleo.index";

import "../src/css/input.css"
import "../src/css/index.css"
import { BlogList } from "../src/adv/blog";
import { MiniMarkdown } from "../src/adv/md";
import { Banner } from "../src/fancy/banner";
import { Stepper } from "../src/adv/stepper";
import { DeleteModal } from "../src/modal/modal1";
import { Treeview } from "../src/fancy/treeview";
// import { Terminal, TypeWriter } from "../src/fancy/terminal";
// import { Banner } from "../src/fancy/banner";

// import { Blog } from "../src/svg/svg"
// import { BlogList } from "../src/adv/blog"
// import { MiniMarkdown } from "../src/adv/md";

export function Storybook() {

    return <SpaceLayout title='Storybook'
        header={<Header rightChildren={<ThemeToggle />} />}
        footer={<Footer />}
        // sidebar={<div class="bg-blue-400">Sidebar</div>}
        // rightPanel={<div><ul>
        //     <li style={{ "width": "100%", height: "250px", "background": "red" }}>Right Panel 1</li>
        //     <li style={{ "width": "100%", height: "250px", "background": "orange" }}>Right Panel 1</li>
        //     <li style={{ "width": "100%", height: "250px", "background": "blue" }}>Right Panel 1</li>
        //     <li style={{ "width": "100%", height: "250px", "background": "green" }}>Right Panel 1</li>
        // </ul></div>}
        children={
            <Box />
        }
        individualScroll
    // fixedNav
    ></SpaceLayout>
}

function Box() {
    return <>

        {/* <GlitterCard /> */}

        {/* <GhostComponent /> */}

        {/* Marquee() */}

        {/* <Terminal
            lines={[
                { text: "> pnpm dlx shadcn@latest init", input: true },
                { text: "✔ Preflight checks.", color: "text-green-500" },
                { text: "You may now add components.", color: "text-muted-foreground", input: true },
            ]}
        />

        {TypeWriter()} */}

        {/* <RainbowImage size="300px" src="https://raw.githubusercontent.com/CodeHariK/Shark.run/main/public/images/SpaceShark512.webp"></RainbowImage> */}

        <div style={{ "display": "flex", "justify-content": "start" }}>
            {
                AllTheme().map((t) =>
                    <section class={t}>
                        {t}
                        <Story />
                    </section>)
            }
        </div>

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

        {Banner()}

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

    </>
}

function Story() {

    return <div>

        <div style={{ "display": "flex", "align-items": "center", "flex-wrap": "wrap" }}>

            {/* <Modal1 /> */}
            {DeleteModal()}
            <Modal child={"Show Modal"} modal={() => "Hi"} />
            <Breadcrumbs />

            <PositionBox
                name={<>{CartIcon()}{<span style={{ "white-space": "nowrap" }}>My Cart</span>}{DownIcon()}</>}>

                <div class="secbg min-w-[300px] z-10 mx-auto space-y-4 overflow-hidden rounded-lg p-4 antialiased shadow-lg">

                    <div>Cart is empty</div>

                </div>

            </PositionBox>

            <Dropdown<string>
                fn={(data) => { console.log(data) }}
                items={[
                    {
                        header: "Names",
                        subitems: [
                            {
                                element: "The most popular",
                                data: "Hello",
                            },
                            { element: <p> Increasing price </p>, },
                        ]
                    },
                    {
                        header: "Names",
                        subitems: [
                            { element: <p> Newest </p>, },
                            { element: <p> Decreasing price </p>, },
                        ]
                    },
                    {
                        subitems: [
                            { element: <p> No. reviews </p>, },
                            { element: <p> Discount % </p>, },
                        ]
                    },
                    { subitems: [] }
                ]} />

            <BaseButton > BaseButton</BaseButton >
            <MaterialButton>MaterialButton</MaterialButton>
            <OutlinedButton>OutlinedButton</OutlinedButton>
            <IconButton>❤️</IconButton>
        </div>

        <SpaceForm id="Hello">
            <TextInput name="Name" type="text" placeholder="Hello Name"
                label="Label"
            ></TextInput>
            <TextInput area name="Area" type="text" placeholder="Hello Area"
                label="Label"
            ></TextInput>
            <CheckboxGroup id="check" checkboxes={[
                {
                    name: "Hello",
                    label: "Hello"
                },
                {
                    name: "Bow",
                    label: "Bow"
                },
            ]}></CheckboxGroup>
            {RatingsBar({ ratings: 3.8, reviews: 5 })}
        </SpaceForm>

        <h1>h1: The electron is a subatomic particle with a negative one elementary electric charge.</h1>
        <h2>h2: The electron is a subatomic particle with a negative one elementary electric charge.</h2>
        <h3>h3: The electron is a subatomic particle with a negative one elementary electric charge.</h3>
        <h4>h4: The electron is a subatomic particle with a negative one elementary electric charge.</h4>
        <h5>h5: The electron is a subatomic particle with a negative one elementary electric charge.</h5>
        <h6>h6: The electron is a subatomic particle with a negative one elementary electric charge.</h6>
        <p>p: The electron is a subatomic particle with a negative one elementary electric charge.</p>

    </div >
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
