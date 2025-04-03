import { Dropdown, SpaceLayoutFull, TextInput, SpaceForm, CheckboxGroup, OutlinedButton, BaseButton, MaterialButton, IconButton, AllTheme, CartIcon, DownIcon, PositionBox } from "../src/solgaleo.index";

import "../src/css/button.css"
import "../src/css/input.css"
import "../src/css/index.css"

export function Storybook() {

    return (

        <SpaceLayoutFull two contentCenter={true} title='Storybook'
        // header={<Header rightChildren={<ThemeToggle />} />}
        // footer={<Footer />}
        >

            {/* <GlitterCard /> */}

            {/* <GhostComponent />

            <RainbowImage size="300px" src="https://raw.githubusercontent.com/CodeHariK/Shark.run/main/public/images/SpaceShark512.webp"></RainbowImage> */}

            <div style={{ "display": "flex", "justify-content": "start" }}>
                {
                    AllTheme().map((t) =>
                        <section class={t}>
                            {t}
                            <Story />
                        </section>)
                }
            </div>

        </SpaceLayoutFull>
    )
}

function Story() {

    return <div>

        <div style={{ "display": "flex", "align-items": "center", "flex-wrap": "wrap" }}>
            <PositionBox
                visible={true}
                name={<>{CartIcon()}{<span style={{ "white-space": "nowrap" }}>My Cart</span>}{DownIcon()}</>}>

                <div class="secbg min-w-[300px] z-10 mx-auto space-y-4 overflow-hidden rounded-lg p-4 antialiased shadow-lg">

                    <div>Cart is empty</div>

                </div>

            </PositionBox>

            <Dropdown<string>
                visible
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