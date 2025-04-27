import { GridLayout, TabContent, Treeview, VCarousel } from '../src/gen';
import { TestHeader } from './common';

export function GridTest() {
    return <GridLayout
        header={<TestHeader />}
        left={<Treeview id='grid' tabsData={gridTabs()} />}
    >
        <TabContent
            id='grid'
            tabsData={gridTabs()}
        />
    </GridLayout>
}

function FixedLeftRight() {
    return <GridLayout
        header={<TestHeader />}
        left={<TestVCarousel />}
        right={<TestVCarousel />}
    >
    </GridLayout>
}

function FixedRight() {
    return <GridLayout
        // header={<TestHeader />}
        right={<TestVCarousel />}
    >
    </GridLayout>
}

function FixedLeft() {
    return <GridLayout
        header={<TestHeader />}
        left={<TestVCarousel />}
    >
    </GridLayout>
}

function FixedEmpty() {
    return <GridLayout
    // header={<TestHeader />}
    >
    </GridLayout>
}

function FixedMiddle() {
    return <GridLayout
        header={<TestHeader />}
    >
        <TestVCarousel />
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
            background: "var(--primary-container)",
            padding: "10px",
            "border-radius": "1rem",
            height: "200px",
            "text-align": 'center',
            "align-content": 'center'
        }}
        listStyle={{ padding: "10px" }} />
}
//FN:END

const gridTabs = () => [
    {
        id: "fixed-all-3",
        label: "fixed-all-3",
        content: <FixedAll3 />
    },
    {
        id: "fixed-middle",
        label: "fixed-middle",
        content: <FixedMiddle />
    },
    {
        id: "fixed-empty",
        label: "fixed-empty",
        content: <FixedEmpty />
    },
    {
        id: "fixed-left",
        label: "fixed-left",
        content: <FixedLeft />
    },
    {
        id: "fixed-right",
        label: "fixed-right",
        content: <FixedRight />
    },
    {
        id: "fixed-left-right",
        label: "fixed-left-right",
        content: <FixedLeftRight />
    }
]
