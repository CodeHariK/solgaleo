import { GridLayout, RoutedTabs } from '../src/gen';
import { List, TestHeader } from './common';

export function GridTest() {
    return <GridLayout
        header={<TestHeader />}
    >
        <RoutedTabs
            id='grid'
            tabs={[
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
            ]}
        />
    </GridLayout>
}

function FixedLeftRight() {
    return <GridLayout
        // header={<TestHeader />}
        left={<List children={[
            "one",
            "two",
            "three",
            "four",
            "five",
        ]} />}
        right={<List children={[
            "one",
            "two",
            "three",
            "four",
            "five",
        ]} />}
    >
    </GridLayout>;
}

function FixedRight() {
    return <GridLayout
        // header={<TestHeader />}
        right={<List children={[
            "one",
            "two",
            "three",
            "four",
            "five",
        ]} />}
    >
    </GridLayout>;
}

function FixedLeft() {
    return <GridLayout
        // header={<TestHeader />}
        left={<List children={[
            "one",
            "two",
            "three",
            "four",
            "five",
        ]} />}
    >
    </GridLayout>;
}

function FixedEmpty() {
    return <GridLayout
    // header={<TestHeader />}
    >
    </GridLayout>;
}

function FixedMiddle() {
    return <GridLayout
    // header={<TestHeader />}
    >
        <List children={[
            "one",
            "two",
            "three",
            "four",
            "five",
        ]} />
    </GridLayout>;
}

function FixedAll3() {
    return <GridLayout
        // header={<TestHeader />}
        left={<List children={[
            "one",
            "two",
            "three",
            "four",
            "five",
        ]} />}
        right={<List children={[
            "one",
            "two",
            "three",
            "four",
            "five",
        ]} />}
    >
        <List children={[
            "one",
            "two",
            "three",
            "four",
            "five",
        ]} />
    </GridLayout>;
}
