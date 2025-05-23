import { Accessor, JSX } from "solid-js";
import { CssUI } from "./gen";
import { For, Show } from "solid-js";
import { IconStar } from "../svg/svg";

export function RatingsBar(props: { ratings?: number, reviews?: number }) {
    const filledStars = () => Math.floor(props.ratings ?? 0);
    const emptyStars = () => 5 - filledStars();

    return (
        <div class="flex items-center gap2">
            <div class="flex items-center">
                <For each={Array(filledStars())}>
                    {() => <IconStar style={{ color: "#fde047" }} />}
                </For>
                <For each={Array(emptyStars())}>
                    {() => <IconStar style={{ color: "#000000" }} />}
                </For>
            </div>

            <Show when={props.ratings}>
                <span>{props.ratings}</span>
            </Show>
            <Show when={props.reviews}>
                <p>({props.reviews})</p>
            </Show>
        </div>
    );
}

/*CSS:
.Progress {
    height: 4px;
    background: var(--surface-bg); 
    border-radius: 5px;
    overflow: hidden;
}
.ProgressFill {
    height: 100%;
    background: var(--primary);
    transition: width 0.2s ease-in-out;
}
*/

export function ProgressBar(props: {
    title?: JSX.Element
    progress?: Accessor<number>,
    boxStyle?: JSX.CSSProperties,
    progressStyle?: JSX.CSSProperties,
}) {
    return (
        <>
            {
                props.title &&
                <div class="flex space-between">
                    <p>{props.title}</p>
                    <span>{props.progress?.()}%</span>
                </div>
            }
            <div class={CssUI.Progress} style={props.boxStyle}>
                <div class={CssUI.ProgressFill}
                    style={{ width: `${props.progress?.()}%`, ...props.progressStyle, }}
                />
            </div>
        </>
    );
}
