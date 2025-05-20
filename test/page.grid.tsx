import { createSignal } from 'solid-js';
import { CheckboxGroup, GridLayout, Select, VCarousel } from '../src/gen';
import { TestHeader } from './common';

export function GridTest() {

    const [gridMode, setGridMode] = createSignal<"fixed" | "scroll" | "flow">()
    const [showList, setShowList] = createSignal<Set<string>>(new Set())

    return <GridLayout
        header={<TestHeader />}
        left={<>
            <Select
                name='mode'
                setValue={setGridMode}
                initialValue="fixed"
                options={[
                    { label: "fixed", value: "fixed" },
                    { label: "scroll", value: "scroll" },
                    { label: "flow", value: "flow" },
                ]} />

            <CheckboxGroup
                name='show'
                setValue={setShowList}
                initialValue={["footer", "header", "left", "right"]}
                style={{ "flex-direction": "column", "align-items": "start" }}
                options={[
                    { label: "header", value: "header" },
                    { label: "footer", value: "footer" },
                    { label: "left", value: "left" },
                    { label: "right", value: "right" },
                ]}>

            </CheckboxGroup>
        </>}
    >
        <GridLayout
            header={showList().has("header") ? <TestHeader /> : null}
            footer={showList().has("footer") ? <TestHeader /> : null}
            left={showList().has("left") ? <TestVCarousel /> : null}
            right={showList().has("right") ? <TestVCarousel /> : null}
            mode={gridMode()}
        >
            <TestVCarousel />
        </GridLayout>
    </GridLayout>
}

//FN:START
//GridLayout : Standard layouts
//FN:DOC
export function FixedAll3() {
    return <GridLayout
        header={<TestHeader />}
        left={<TestVCarousel />}
        right={<TestVCarousel />}
    >
        <TestVCarousel />
    </GridLayout>
}
//FN:END

//FN:START
//VCarousel : Vertical carousel list
//FN:DOC
export function TestVCarousel() {
    return <VCarousel children={[
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "nine",
        "ten",
    ]}
        itemStyle={{
            background: "var(--primary-bg)",
            padding: "10px",
            "border-radius": "1rem",
            height: "200px",
            "text-align": 'center',
            "align-content": 'center'
        }}
        listStyle={{ padding: "10px" }} />
}
//FN:END
