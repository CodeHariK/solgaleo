import { JSX } from "solid-js";
import { CssFANCY } from "./gen";

/*CSS:
.FlickerText {
    sol(--flicker-shadow , #36e2f8);

    color: #3694f8;
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

/*CSS:
.skeleton {
    background-color: var(--surface-bg);
    position: relative;
    overflow: hidden;
}

.skeleton::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    background: linear-gradient(
        90deg,
        var(--surface-bg) 0%,
        var(--surface-tint) 50%,
        var(--surface-bg) 100%
    );
    animation: shimmer 2s infinite ease-in-out;
}

@keyframes shimmer {
    100% {
        left: 100%;
    }
}

*/

export function Skeleton(props: {
    width?: number | string;
    height?: number | string;
    variant?: "circular" | "rectangular" | "rounded";
    class?: string;
}) {
    const borderRadius = () => {
        switch (props.variant) {
            case "circular":
                return "50%";
            case "rounded":
                return "8px";
            case "rectangular":
            default:
                return "0";
        }
    };

    return (
        <div
            class={`skeleton ${props.class ?? ""}`}
            style={{
                width: typeof props.width === "number" ? `${props.width}px` : props.width,
                height: typeof props.height === "number" ? `${props.height}px` : props.height,
                "border-radius": borderRadius(),
            }}
        />
    );
}