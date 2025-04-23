import { createSignal, JSX } from "solid-js";
import { CssUI } from "./gen";

/*CSS:-

.AccordionLabel {
    cursor: pointer;
    
    :hover {
        background: var(--surface); 
    }
}

.AccordionContent {
    max-height: 0;
    overflow: hidden;
    transition: all 0.2s ease-out;
    opacity: 0;
}

*/

export function Accordion(props: {
    title: JSX.Element,
    children: JSX.Element,
    contentStyle?: JSX.CSSProperties
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
                    ...props.contentStyle,
                    "max-height": "40vh",
                    "overflow-y": "scroll",
                    opacity: 1,
                } : {}}
            >
                {props.children}
            </div>
        </>
    );
}
