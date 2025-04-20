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
    transition: max-height 0.35s ease-out, opacity 0.35s ease-out;
    opacity: 0;
}

*/

function AccordionItem(props: { title: string, children: JSX.Element }) {
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
                    "max-height": "20rem",
                    opacity: 1,
                    "overflow-y": "scroll",
                } : {}}
            >
                {props.children}
            </div>
        </>
    );
}

export function Accordion(props: { items: { title: string, content: JSX.Element }[] }) {
    return (
        <>
            {props.items.map((item) => (
                <AccordionItem title={item.title}>
                    {item.content}
                </AccordionItem>
            ))}
        </>
    );
}