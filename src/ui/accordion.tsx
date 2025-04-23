import { createSignal, JSX } from "solid-js";
import { CssUI } from "./gen";

/*CSS:-

.AccordionLabel {
    display: flex;
    background: var(--surface);
    cursor: pointer;
    justify-content: space-between;
    padding: .5rem;
    
    :hover {
        background: var(--surface); 
    }
}

.AccordionContent {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out, opacity 0.35s ease-out;
    opacity: 0;
}

*/

export function Accordion(props: {
    title: JSX.Element,
    children: JSX.Element,
    openStyle?: JSX.CSSProperties
}) {
    const [isOpen, setIsOpen] = createSignal(false);

    const toggle = () => {
        setIsOpen(!isOpen());
    };

    return (
        <>
            <div class={CssUI.AccordionLabel} onClick={toggle}>
                {props.title}
            </div>
            <div
                class={CssUI.AccordionContent}
                style={isOpen() ? {
                    ...props.openStyle,
                    "max-height": "100%",
                    opacity: 1,
                } : {}}
            >
                {props.children}
            </div>
        </>
    );
}
