import { type JSX } from 'solid-js';
import { CssFANCY } from './gen';

/*CSS:*
.Rainbow {
    background: linear-gradient(to right,
            blueviolet,
            lawngreen,
            red,
            yellow,
            deepskyblue);
    -webkit-background-clip: text;
    color: transparent;
    animation: AnimRainbow 6s ease-in-out infinite;
    background-size: 400% 100%;
}
@keyframes AnimRainbow {
    0%,
    100% {
        background-position: 0 0;
    }
    50% {
        background-position: 100% 0;
    }
}

.Raincon {
    background-image: sol(--rainsrc);
    -webkit-mask-image: sol(--rainsrc);
    -webkit-mask-size: cover;
    background-size: sol(--rainsize);
    width: sol(--rainsize);
    height: sol(--rainsize);
    display: inline-block;
}
.RainconGrad {
    background-image: linear-gradient(-45deg,
            #ee76526e,
            #e73c7e9a,
            #e1e73c9a,
            #23a5d59a,
            #23d5ab9a);
    background-size: 400%;
    background-repeat: no-repeat;
    animation: AnimRaincon 5s ease infinite;
    width: inherit;
    height: inherit;
}

@keyframes AnimRaincon {
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

export function RainbowText({ children, style, class: className }: {
    children: JSX.Element,
    style?: JSX.CSSProperties,
    class?: string
}) {
    return <span class={[CssFANCY.Rainbow, className].join(" ")} style={style}>
        {children}
    </span>
}


export function RainbowImage(props: {
    size: string;
    src: string;
}) {
    return <div
        class={CssFANCY.Raincon}
        style={{
            [CssFANCY.varRainsize]: props.size,
            [CssFANCY.varRainsrc]: `url(${props.src})`,
        }}>
        <div class={CssFANCY.RainconGrad}>
            <slot />
        </div>
    </div>
}
