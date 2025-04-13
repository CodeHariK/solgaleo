
import { For, Show, createSignal, type JSX } from 'solid-js';
import { PositionBox } from "./position.tsx";
import { IconChevronRight } from "../svg/svg.tsx";
import { CssUI } from "./gen.ts";
import { RandomColor } from '../utils/color.ts';

/*CSS:

.Dropdown {
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    
    background: var : #e0e0e0 : #575757;
    border-radius: .3rem;
    padding: .3rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    ul {
        list-style-type: none;
        padding-left: 0rem;
        margin: 0.2rem 0;
    }
}

.DropdownHeader {
    color: var : #9c40ca : #8a87e3;
    background: var : #cfcfcf : #454545;
    border: var : none : none;
    padding: 0.3rem;
}

.DropdownItem {
    color: var : #343434 : #f8f8f8;
    background: var : #ebebeb : #4f4f4f;
    border: var : none : none;

    // display: inline-flex;

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.3rem;
    cursor: pointer;
}

.DropdownItem:hover {
    color: var : #d4d4d4 : #4b4b4b;
    background: var : #6b6b6b : #d7d7d7;
}

ul.DropdownNested {
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

function DropdownList<T>({ items, level = 0, onSelect }: {
    items: DropdownSubItem<T>[];  // Changed from DropdownItem to DropdownSubItem
    level?: number;
    onSelect: (data: T) => void;
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
                                style={{ background: RandomColor() }}
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
    button,
    items,
    visible = false,
    fn
}: {
    id?: string;
    button: JSX.Element;
    visible?: boolean;
    fn?: (data: T) => void;
    items: DropdownItem<T>[];
}) {

    const handleItemClick = (data: T) => {
        fn?.(data);
    };

    return (
        <PositionBox
            align={{ x: 0, y: 1 }}
            visible={visible}
            name={button}
        >
            <div
                id={id}
                class={CssUI.Dropdown}
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
                                />
                            </Show>
                        </div>
                    )}
                </For>
            </div>
        </PositionBox>
    );
}
