import { type JSX } from 'solid-js';

import '../css/rainbow.css';

export const RainbowText = (props: { children: JSX.Element }) => (
    <span class="rainbow">{props.children}</span>
);

interface Props {
    size: string;
    src: string;
}

export const RainbowImage = (props: Props) => {
    return <div
        class="raincon"
        style={{
            "--size": props.size,
            "--src": `url(${props.src})`,
        }}>
        <div class="rainbow_grad">
            <slot />
        </div>
    </div>
}