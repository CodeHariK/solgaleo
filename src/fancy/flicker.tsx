
import { CssFANCY } from "./gen";

/*CSS:
.SFlickerText {
    --flicker-shadow: #36e2f8;
    font-size: 4rem;
    font-weight: bold;
    font-size: 1.5rem;
    color: var : #3694f8;
    letter-spacing: 5px;
    margin-bottom: 10px;
    text-shadow:
        0 0 10px var(--flicker-shadow),
        0 0 20px var(--flicker-shadow),
        0 0 30px var(--flicker-shadow);
    animation: flicker 2s infinite alternate;
}

@keyframes flicker {

    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
        text-shadow:
            0 0 10px var(--flicker-shadow),
            0 0 20px var(--flicker-shadow),
            0 0 30px var(--flicker-shadow);
    }

    20%,
    24%,
    55% {
        text-shadow: none;
    }
}

*/

export function FlickerText(props: { text: string }) {
    return <span class={CssFANCY.SFlickerText}>{props.text}</span>;
}