import { JSX, Show } from "solid-js";
import { CssUI } from "./gen";

/*CSS:
.Card {
    border: 1px solid var(--surface);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.CardHeader {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.CardContent {
    padding: calc(.5 * var(--spacing));
}

.CardFooter {
    padding: calc(.5 * var(--spacing));
    display: flex;
    justify-content: flex-end;
    gap: calc(.5 * var(--spacing));
}
*/

interface CardProps {
    title?: JSX.Element;
    children?: JSX.Element;
    footer?: JSX.Element;
    cardClass?: string;
}

export function Card(props: CardProps) {
    return (
        <div class={`${CssUI.Card} ${props.cardClass ?? ''}`}>

            <div class={CssUI.CardHeader}>
                {props.title}
            </div>


            <div class={CssUI.CardContent}>
                {props.children}
            </div>

            <Show when={props.footer}>
                <div class={CssUI.CardFooter}>
                    {props.footer}
                </div>
            </Show>
        </div>
    );
}
