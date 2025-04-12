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
                    content: <GridLayout
                        header={<TestHeader />}
                        left={
                            <List children={[
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
                    </GridLayout>
                },
                {
                    id: "fixed-middle",
                    label: "fixed-middle",
                    content: <GridLayout
                        header={<TestHeader />}
                    >
                        <List children={[
                            "one",
                            "two",
                            "three",
                            "four",
                            "five",
                        ]} />
                    </GridLayout>
                },
                {
                    id: "fixed-empty",
                    label: "fixed-empty",
                    content: <GridLayout
                        header={<TestHeader />}
                    >
                    </GridLayout>
                },
                {
                    id: "fixed-left",
                    label: "fixed-left",
                    content: <GridLayout
                        header={<TestHeader />}
                        left={<List children={[
                            "one",
                            "two",
                            "three",
                            "four",
                            "five",
                        ]} />
                        }
                    >
                    </GridLayout>
                },
                {
                    id: "fixed-right",
                    label: "fixed-right",
                    content: <GridLayout
                        header={<TestHeader />}
                        right={<List children={[
                            "one",
                            "two",
                            "three",
                            "four",
                            "five",
                        ]} />
                        }
                    >
                    </GridLayout>
                },
                {
                    id: "fixed-left-right",
                    label: "fixed-left-right",
                    content: <GridLayout
                        header={<TestHeader />}
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
                        ]} />
                        }
                    >
                    </GridLayout>
                }
            ]}
        />
    </GridLayout>
}
