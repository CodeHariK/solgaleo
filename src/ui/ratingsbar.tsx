import { For, Show } from "solid-js";
import { IconStar } from "../svg/svg";

export function RatingsBar(props: { ratings?: number, reviews?: number }) {
    const filledStars = () => Math.floor(props.ratings ?? 0);
    const emptyStars = () => 5 - filledStars();

    return (
        <div class="flex items-center gap-2">
            <div class="flex items-center">
                <For each={Array(filledStars())}>
                    {() => <IconStar props={{ color: "#fde047" }} />}
                </For>
                <For each={Array(emptyStars())}>
                    {() => <IconStar props={{ color: "#000000" }} />}
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
