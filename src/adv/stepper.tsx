import { JSX } from "solid-js/jsx-runtime"
import { IconTick } from "../svg/svg"

/* CSS:
.stepper {
    color: var: #6B7280: #ffffff;
    background: var::;
    border: var::1px solid #E5E7EB;
    position: relative;
}
*/

export function Stepper({ items }: { items: { title: string, subtitle?: string, element: JSX.Element }[] }) {
    return items.length == 0 ? <></> : <div class="p-12">
        <ol class="stepper">
            {items.map((item, i) => {
                return <li style={{
                    "margin-bottom": (i == (items.length - 1)) ? "" : "2.5rem",
                    "margin-inline-start": "1.5rem"
                }}>
                    <IconTick />
                    <h3>{item.title}</h3>
                    {item.subtitle && <p>{item.subtitle}</p>}
                    {item.element}
                </li>
            })}
        </ol>
    </div>
}
