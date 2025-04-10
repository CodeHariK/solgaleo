import { type JSX } from 'solid-js';
import { CssFANCY } from './gen';

/*CSS:
.SRainbow {
    background: linear-gradient(to right,
            blueviolet,
            lawngreen,
            red,
            yellow,
            deepskyblue);
    -webkit-background-clip: text;
    color: transparent;
    animation: SRainbowAnim 6s ease-in-out infinite;
    background-size: 400% 100%;
}
@keyframes SRainbowAnim {
    0%,
    100% {
        background-position: 0 0;
    }
    50% {
        background-position: 100% 0;
    }
}

.SRaincon {
    background-image: var(--rainsrc);
    -webkit-mask-image: var(--rainsrc);
    -webkit-mask-size: cover;
    background-size: var(--rainsize);
    width: var(--rainsize);
    height: var(--rainsize);
    display: inline-block;
}
.SRainconGrad {
    background-image: linear-gradient(-45deg,
            #ee76526e,
            #e73c7e9a,
            #e1e73c9a,
            #23a5d59a,
            #23d5ab9a);
    background-size: 400%;
    background-repeat: no-repeat;
    animation: SRainconAnim 5s ease infinite;
    width: inherit;
    height: inherit;
}

@keyframes SRainconAnim {
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

export function RainbowText(props: { children: JSX.Element }) {
    return <span class={CssFANCY.SRainbow}>{props.children}</span>
}


export function RainbowImage(props: {
    size: string;
    src: string;
}) {
    return <div
        class={CssFANCY.SRaincon}
        style={{
            [CssFANCY.varRainsize]: props.size,
            [CssFANCY.varRainsrc]: `url(${props.src})`,
        }}>
        <div class={CssFANCY.SRainconGrad}>
            <slot />
        </div>
    </div>
}
