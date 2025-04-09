/* CSS:
.SMarquee{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    span{
        text-transform: uppercase;
        will-change: transform;
        transform: translateX(0);
        white-space: nowrap;
        animation: marqueeAnim 24s linear infinite;
        font-size: 200px;
        font-weight: 900;
        color: #b3ff98;
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

import { SolCSS } from "./gen";

export function Marquee() {
    return <div class={SolCSS.SMarquee}>
        <span>Hello World&nbsp;</span>
        <span>Hello World&nbsp;</span>
        <span>Hello World&nbsp;</span>
        <span>Hello World&nbsp;</span>
    </div>;
}
