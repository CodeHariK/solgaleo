import { type JSX } from 'solid-js';
import { MetaProvider, Title } from "@solidjs/meta";

type SpaceLayout = {
    title: string;

    header?: JSX.Element;
    footer?: JSX.Element;


    children?: JSX.Element | JSX.Element[];

    fixedNav?: boolean;
    individualScroll?: boolean;

    sidebar?: JSX.Element;
    rightPanel?: JSX.Element;
};

export const SpaceLayout = (props: SpaceLayout) => (

    <MetaProvider>
        <Title>{props.title}</Title>

        <main
            style={{
                display: "flex",
                "flex-direction": "column",
                "min-height": "100vh",
                height: (props.individualScroll || props.fixedNav) ? "100vh" : "auto",
            }}
        >

            {props.header}

            <section
                style={{
                    display: "flex",
                    "flex-direction": "row",
                    flex: "1 1 0%",
                    height: "100%",

                    ...(props.fixedNav && {
                        "overflow-y": "auto",
                    }),
                }}
            >
                {props.sidebar &&
                    <aside
                        style={{
                            flex: "1 1 0%",
                            background: "#153d6f",
                            ...(props.individualScroll && {
                                "overflow-y": "auto",
                            }),
                        }}
                    >
                        {props.sidebar}
                    </aside>
                }
                {props.children &&
                    <section
                        style={{
                            flex: "1 1 0%",
                            background: "#d07900",
                            ...(props.individualScroll && {
                                "overflow-y": "auto",
                            }),
                        }}
                    >
                        {props.children}
                    </section>
                }
                {props.rightPanel &&
                    <aside
                        style={{
                            flex: "1 1 0%",
                            background: "#a027f7",
                            ...(props.individualScroll && {
                                "overflow-y": "auto",
                            }),
                        }}
                    >
                        {props.rightPanel}
                    </aside>
                }
            </section>

            {props.footer}

        </main>

    </MetaProvider>
);

