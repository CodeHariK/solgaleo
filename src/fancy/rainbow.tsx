import { type JSX } from 'solid-js';

/*CSS:
.rainbow {
    background: linear-gradient(to right,
            blueviolet,
            lawngreen,
            red,
            yellow,
            deepskyblue);
    -webkit-background-clip: text;
    color: transparent;
    animation: rainbow_animation 6s ease-in-out infinite;
    background-size: 400% 100%;
}

@keyframes rainbow_animation {

    0%,
    100% {
        background-position: 0 0;
    }

    50% {
        background-position: 100% 0;
    }
}


.raincon {
    background-image: var(--src);

    -webkit-mask-image: var(--src);
    -webkit-mask-size: cover;
    background-size: var(--size);
    width: var(--size);
    height: var(--size);
    display: inline-block;
}

.rainbow_grad {
    background-image: linear-gradient(-45deg,
            #ee76526e,
            #e73c7e9a,
            #e1e73c9a,
            #23a5d59a,
            #23d5ab9a);
    background-size: 400%;
    background-repeat: no-repeat;

    animation: gradient 5s ease infinite;
    width: inherit;
    height: inherit;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
*/

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