import { For, JSX } from "solid-js";
import { CssNAV } from "./gen";

/*CSS:
.Breadcrumb {
    box-shadow: 0 8px 14px -2px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 0.75rem 1.25rem;
}

.BreadcrumbLinks {
    list-style-type: none;
    display: flex;
    gap: 1rem;
    align-items: center;
    margin: 0;
    padding: 0;
}

.BreadcrumbLink {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.2s;
}

.BreadcrumbLink:hover {
    color: #e05050;
}

.BreadcrumbSeparator {
    color: #d1d5db;
    margin: 0 0.5rem;
}
*/

type BreadcrumbItem = {
    element: JSX.Element;
    link?: string;
    fn?: () => void;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return <nav class={CssNAV.Breadcrumb}>
        <ul class={CssNAV.BreadcrumbLinks}>
            <For each={items}>
                {(item, index) => (
                    <li>
                        <a
                            class={CssNAV.BreadcrumbLink}
                            href={item.link}
                            onClick={(e) => {
                                if (item.fn) {
                                    e.preventDefault();
                                    item.fn();
                                }
                            }}
                        >
                            {item.element}
                        </a>
                        {index() < items.length - 1 && (
                            <span class={CssNAV.BreadcrumbSeparator}>/</span>
                        )}
                    </li>
                )}
            </For>
        </ul>
    </nav>
}
