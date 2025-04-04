import { type JSX } from 'solid-js';
import { MetaProvider, Title } from "@solidjs/meta";

type SpaceLayoutFullProps = {
    title: string;
    children?: JSX.Element | JSX.Element[];
    header?: JSX.Element;
    footer?: JSX.Element;
};

export const SpaceLayoutFull = (props: SpaceLayoutFullProps) => (

    <MetaProvider>
        <Title>{props.title}</Title>

        <main>
            {props.header}

            <section>
                {props.children}
            </section>

            {props.footer}

        </main>

    </MetaProvider>
);
