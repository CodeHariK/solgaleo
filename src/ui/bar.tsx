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
    // background: linear-gradient(90deg,
    //     var(--primary) 0%, 
    //     var(--secondary) 50%,
    //     var(--primary) 100%);
    transition: width 0.2s ease-in-out;
}
*/

export function ProgressBar({ progress, boxStyle, progressStyle }: {
    progress?: Accessor<number>,
    boxStyle?: JSX.CSSProperties,
    progressStyle?: JSX.CSSProperties,
}) {
    return (
        <div class={CssUI.Progress} style={boxStyle}>
            <div class={CssUI.ProgressFill}
                style={{ width: `${progress?.()}%`, ...progressStyle, }}
            />
        </div>
    );
}
