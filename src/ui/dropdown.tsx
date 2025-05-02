
import { For, Show, createSignal, type JSX } from 'solid-js';
import { IconChevronRight } from "../svg/svg.tsx";
import { CssUI } from "./gen.ts";

/*CSS:

.Dropdown {
    display: flex;
    flex-direction: row;
    gap: .5rem;
    
    ul {
        list-style-type: none;
        padding-left: 0rem;
        margin: 0.2rem 0;
    }
}

.DropdownHeader {
    border-bottom: 1px solid var(--body-bg);
    padding: 0.3rem;
}

.DropdownItem {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.3rem;
    cursor: pointer;
}

.DropdownItem:hover {
    color: none;
    background: var(--secondary);
}

ul .DropdownNested {
    padding-left: 1rem;
    margin: 0.2rem 0;
}

.DropdownToggle {
    display: inline-flex;
    align-items: center;
    margin-left: 0.5rem;
    transition: transform 0.2s;
}

.DropdownToggle.open {
    transform: rotate(90deg);
}

*/

export type DropdownItem<T> = {
    header?: string;
    subitems?: DropdownSubItem<T>[];
};

export type DropdownSubItem<T> = {
    element: JSX.Element;
    data?: T;
    children?: DropdownSubItem<T>[];
};

function DropdownList<T>({
    items,
    level = 0,
    onSelect,
    dropdownItemStyle
}: {
    items: DropdownSubItem<T>[];  // Changed from DropdownItem to DropdownSubItem
    level?: number;
    onSelect: (data: T) => void;
    dropdownItemStyle?: JSX.CSSProperties;
}) {
    return (
        <ul class={level > 0 ? CssUI.DropdownNested : ''}>
            <For each={items}>
                {(item) => {
                    const [isOpen, setIsOpen] = createSignal(false);
                    const hasChildren = item.children?.length > 0;

                    return (
                        <li>
                            <div
                                class={CssUI.DropdownItem}
                                style={dropdownItemStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (hasChildren) {
                                        setIsOpen(!isOpen());
                                    } else if (item.data) {
                                        onSelect(item.data);
                                    }
                                }}
                            >
                                {item.element}
                                <Show when={hasChildren}>
                                    <span class={`${CssUI.DropdownToggle} ${isOpen() ? 'open' : ''}`}>
                                        <IconChevronRight />
                                    </span>
                                </Show>
                            </div>
                            <Show when={hasChildren && isOpen()}>
                                <DropdownList
                                    items={item.children}
                                    level={level + 1}
                                    onSelect={onSelect}
                                    dropdownItemStyle={dropdownItemStyle}
                                />
                            </Show>
                        </li>
                    );
                }}
            </For>
        </ul>
    );
}

export function Dropdown<T>({
    id,
    items,
    handleItemClick,
    dropdownStyle,
    dropdownItemStyle,
}: {
    id?: string;
    handleItemClick?: (data: T) => void;
    items: DropdownItem<T>[];
    dropdownStyle?: JSX.CSSProperties,
    dropdownItemStyle?: JSX.CSSProperties;
}) {
    return (
        <div
            id={id}
            class={CssUI.Dropdown}
            style={dropdownStyle}
            role="menu"
            aria-orientation="vertical"
        >
            <For each={items}>
                {(item) => (
                    <div>
                        <Show when={item.subitems?.length > 0}>
                            <Show when={item.header}>
                                <h6 class={CssUI.DropdownHeader}>{item.header}</h6>
                            </Show>
                            <DropdownList
                                items={item.subitems}
                                onSelect={handleItemClick}
                                dropdownItemStyle={dropdownItemStyle}
                            />
                        </Show>
                    </div>
                )}
            </For>
        </div>
    );
}
