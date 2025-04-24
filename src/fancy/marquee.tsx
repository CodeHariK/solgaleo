import { For, JSX } from "solid-js";
import { CssFANCY } from "./gen";

/*CSS:*
.Marquee{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    .MarqueeChild{
        text-transform: uppercase;
        will-change: transform;
        transform: translateX(0);
        white-space: nowrap;
        animation: marqueeAnim 8s linear infinite;
    }
}
@keyframes marqueeAnim {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
*/

export function Marquee({ child, repeatCount, className, style }: {
    child: () => JSX.Element,
    repeatCount: number,
    className?: string,
    style?: JSX.CSSProperties,
}) {
    return <div class={CssFANCY.Marquee} classList={{ className: className != null }} style={style}>
        <For each={Array.from({ length: repeatCount })}>
            {() => (
                <span class="MarqueeChild">
                    {child()}
                </span>
            )}
        </For>
    </div>;
}
