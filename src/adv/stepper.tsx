import { JSX } from "solid-js/jsx-runtime"

/* CSS:
.stepper {
    color: var: #ffffff: #aaaaaa 
    background: var: red : green
    border: var::1px solid blue
    position: relative
}
.stepper:hover {
    background: var:yellow:red
}
*/

export function Stepper({ items }: { items: { title: string, subtitle?: string, element: JSX.Element }[] }) {
    return items.length == 0 ? <></> : <div class="p-12">
        <ol class="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">

            {items.map((item, i) => {
                return <li style={{ "margin-bottom": (i == (items.length - 1)) ? "" : "2.5rem", "margin-inline-start": "1.5rem" }}>
                    {Sv()}
                    <h3 class="font-medium leading-tight">{item.title}</h3>
                    {item.subtitle && <p class="text-sm">{item.subtitle}</p>}
                    {item.element}
                </li>
            })}
        </ol>
    </div>
}

function Sv() {
    return <span class="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
        <svg class="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
        </svg>
    </span>
}
