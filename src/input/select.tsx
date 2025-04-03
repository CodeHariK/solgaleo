import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";
import { PositionBox } from "./position";

import { type JSX } from 'solid-js';
import { DownIcon, FilterIcon } from "../svg/svg";

import "../css/input.css"

type OptionType = {
    value: string;
    label: string;
};

type SelectProps = {
    id: string;
    options: Array<OptionType>;
    disabled?: boolean;
    header?: string;
};

export function Select(props: SelectProps) {
    const { state, handleChange } = useSpaceContext();

    return (
        <div class="mb-4">
            <label for={props.id} class="block mt-2 mb-1 text-sm font-medium text-gray-900 night:text-white">
                {props.header}
            </label>
            <select
                id={props.id}
                name={props.id} // Use `props.id` as the name to match context handling
                value={state().values[props.id] || ""}
                disabled={props.disabled}
                class="AppSelect"
                onChange={(e) => handleChange(props.id, e.target.value)}
            >
                <Key each={props.options} by="value">
                    {(option) => (
                        <option value={option().value} >
                            {option().label}
                        </option>
                    )}
                </Key>
            </select>
        </div>
    );
}

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
        name={<>{FilterIcon()}{<span>Filter</span>}{DownIcon()}</>}>

        <div id={id} class="AppDropdown"
            data-popper-placement="bottom">

            {items.map((item) => {
                return item.subitems.length == 0 ? <></> :
                    <>
                        {item.header && <h6 class="AppDropdownHeader">{item.header}</h6>}
                        <ul class="text-left text-sm font-medium" aria-labelledby="sortDropdownButton">
                            {item.subitems.map((e) => {
                                return <li>
                                    <a href="#" class="AppDropdownItem"
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
