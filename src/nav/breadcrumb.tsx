import { For, JSX } from "solid-js";
import { CssNAV } from "./gen";

/*CSS:*
.Breadcrumb {
    padding: 0.75rem 1.25rem;
}

.BreadcrumbLinks {
    list-style-type: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;

    li {
        display: flex;
    }
}

.BreadcrumbLink {
    color: var(--primary);
    text-decoration: none;
    transition: color 0.2s;
}

.BreadcrumbLink:hover {
    color: var(--secondary);
}

.BreadcrumbSeparator {
    color: var(--primary);
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
