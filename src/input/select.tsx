import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";
import { PositionBox2, ToggleOptions } from "./dropdown";

import { type JSX } from 'solid-js';
import { DownIcon, FilterIcon } from "../svg/svg";

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

export type DropdownProps<T> = {
    name: JSX.Element;
    options: T[];
    show?: boolean;
    fn: (option: T) => void;
};

export function DropdownToggle<T>(props: DropdownProps<T>) {
    return (
        <ToggleOptions name={props.name} show={props.show ?? false}>
            <div class="min-w-[150px]">
                {props.options.map((option) => (
                    <a
                        class="bg-[var(--dropdown-bg)] text-[var(--dropdown-color)]
                            hover:bg-[var(--dropdown-hover-bg)] hover:text-[var(--dropdown-hover-color)]
                            group inline-flex w-full items-center rounded-md px-3 py-2 text-sm"
                        onClick={() => props.fn(option)} // Pass the clicked option to the fn callback
                    >
                        {option as string}
                    </a>
                ))}
            </div>
        </ToggleOptions>
    );
}

export function Dropdown({ id, items }: { id?: string, items: JSX.Element[] }) {
    return <PositionBox2 align={{ x: 0, y: 1 }}
        name={<p>{FilterIcon()}{<span>Filter</span>}{DownIcon()}</p>}>
        <div id={id} class="bg-[var(--dropdownitem-bg)] z-50 w-40 divide-y divide-gray-100 rounded-lg shadow" data-popper-placement="bottom">
            <ul class="p-2 text-left text-sm font-medium" aria-labelledby="sortDropdownButton">

                {items.map((e) => {
                    return <DropdownItem title={e} />
                })}

            </ul>
        </div>
    </PositionBox2>;
}

function DropdownItem({ title }: { title: JSX.Element }) {
    return (<li>
        <a href="#" class="bg-[var(--dropdown-bg)] text-[var(--dropdown-color)]
          hover:bg-[var(--dropdown-hover-bg)] hover:text-[var(--dropdown-hover-color)]
          group inline-flex w-full items-center rounded-md px-3 py-2 text-sm">
            {title}
        </a>
    </li>);
}
