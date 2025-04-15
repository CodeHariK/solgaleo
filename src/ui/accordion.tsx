// src/Accordion.tsx
import { createSignal, JSX } from "solid-js";

/*CSS:
.accordion {
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
}

.accordion-item {
    border-bottom: 1px solid #ccc;
}

.accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    cursor: pointer;
    background: transparent;
    transition: background 0.3s;
}

.accordion-header:hover {
    background-color: #e1e1e144;
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    padding: 0 15px;
}

.accordion-content.open {
    max-height: 200px; 
    padding: 15px;
}

*/

function AccordionItem(props: { title: JSX.Element, children: JSX.Element }) {
    const [isOpen, setIsOpen] = createSignal(false);

    const toggle = () => setIsOpen(!isOpen());

    return (
        <div class="accordion-item">
            <div class="accordion-header" onClick={toggle}>
                <h3>{props.title}</h3>
                <span>{isOpen() ? "−" : "+"}</span>
            </div>
            <div class={`accordion-content ${isOpen() ? "open" : ""}`}>
                {props.children}
            </div>
        </div>
    );
};

export function Accordion(props: { items: { title: string, content: JSX.Element }[] }) {
    return (
        <div class="accordion">
            {props.items.map((item) => (
                <AccordionItem title={item.title}>
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
};
