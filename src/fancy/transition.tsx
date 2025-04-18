import { Show, JSX } from "solid-js";

export function TransitionWidget(props: {
    showFirstWidget: boolean,
    one: JSX.Element,
    two: JSX.Element
}) {
    return (
        <>
            <Show when={props.showFirstWidget}>
                {props.one}
            </Show>

            <Show when={!props.showFirstWidget}>
                {props.two}
            </Show>
        </>
    );
};
