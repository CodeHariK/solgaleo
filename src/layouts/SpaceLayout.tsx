import { type JSX } from 'solid-js';
import { MetaProvider, Title } from "@solidjs/meta";

type SpaceLayoutProps = {
    title: string;
    one?: boolean;
    two?: boolean;
    contentCenter?: boolean;
    children?: JSX.Element | JSX.Element[];
    header?: JSX.Element;
    footer?: JSX.Element;
};

export const SpaceLayout = (props: SpaceLayoutProps) => (

    <MetaProvider>
        <Title>{props.title}</Title>

        <main
            class={`${props.one ? "h-full" : ""} ${props.two ? "h-screen" : ""}`}
        >
            {props.header}

            <section
                class={`w-full ${props.contentCenter && 'content-center'} ${props.two ? "h-full overflow-y-scroll" : ""}`}
            >
                {props.children}
            </section>

            {props.footer}

        </main>

    </MetaProvider>
);
