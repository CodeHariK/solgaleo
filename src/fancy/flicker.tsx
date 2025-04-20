import { JSX } from "solid-js";
import { CssFANCY } from "./gen";

/*CSS:-
.FlickerText {
    --flicker-shadow: var : #36e2f8;

    color: var : #3694f8;
    letter-spacing: 5px;
    animation: AnimFlicker 2s infinite alternate;
}

@keyframes AnimFlicker {

    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
        text-shadow:
            0 0 2rem var(--flicker-shadow),
            0 0 3rem var(--flicker-shadow);
    }

    20%,
    24%,
    55% {
        text-shadow: none;
    }
}

*/

export function FlickerText({ children, style, class: className }: {
    children: JSX.Element,
    style?: JSX.CSSProperties,
    class?: string
}) {
    return <span class={[CssFANCY.FlickerText, className].join(" ")} style={style}>{children}</span>;
}
