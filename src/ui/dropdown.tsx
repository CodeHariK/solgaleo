import { PositionBox } from "./position.tsx";

import { type JSX } from 'solid-js';
import { IconDown, IconFilter } from "../svg/svg.tsx";
import { CssUI } from "./gen.ts";

/*CSS:

.SolDropdown {
    background: var : #e0e0e0 : #575757;
    border-radius: .3rem;
    padding: .3rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.SolDropdownHeader {
    color: var : #9c40ca : #8a87e3;
    background: var : #cfcfcf : #454545;
    border: var : none : none;
    padding: 0.3rem;
}

.SolDropdownItem {
    color: var : #343434 : #f8f8f8;
    background: var : #ebebeb : #4f4f4f;
    border: var : none : none;
    display: inline-flex;
    padding: 0.3rem;
    align-items: center;
    width: 100%;
}

.SolDropdownItem:hover {
    color: var : #d4d4d4 : #4b4b4b;
    background: var : #6b6b6b : #d7d7d7;
}

*/

export function Dropdown<T>({ id, items, visible, fn }: {
    id?: string,
    visible?: boolean,
    fn?: (data: T) => void,
    items: {
        header?: string,
        subitems: {
            element: JSX.Element;
            data?: T;
        }[],
    }[],
}) {
    return <PositionBox align={{ x: 0, y: 1 }}
        visible={visible}
        name={<>{<IconFilter />}{<span>Filter</span>}{<IconDown />}</>}>

        <div id={id} class={CssUI.SolDropdown}
            role="menu" aria-orientation="vertical"
            aria-labelledby="sortDropdownButton"
            tabindex="-1"
            data-popper-placement="bottom">

            {items.map((item) => {
                return item.subitems.length == 0 ? <></> :
                    <>
                        {item.header && <h6 class={CssUI.SolDropdownHeader}>{item.header}</h6>}
                        <ul aria-labelledby="sortDropdownButton">
                            {item.subitems.map((e) => {
                                return <li>
                                    <a href="#" class={CssUI.SolDropdownItem}
                                        onclick={() => fn?.(e.data)}>
                                        {e.element}
                                    </a>
                                </li>
                            })}
                        </ul>
                    </>
            })}

        </div>
    </PositionBox>;
}
