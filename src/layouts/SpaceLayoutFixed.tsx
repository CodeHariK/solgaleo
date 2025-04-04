import { type JSX } from 'solid-js';
import { MetaProvider, Title } from "@solidjs/meta";

type SpaceLayoutFixedProps = {
    title: string;
    contentCenter?: boolean;
    children?: JSX.Element | JSX.Element[];
    header?: JSX.Element;
    footer?: JSX.Element;
};

export const SpaceLayoutFixed = (props: SpaceLayoutFixedProps) => (

    <MetaProvider>
        <Title>{props.title}</Title>

        <main class="h-screen flex flex-col">
            {props.header}

            <section class="flex-1 overflow-y-auto">
                {props.children}
            </section>

            {props.footer}
        </main>

    </MetaProvider>
);
