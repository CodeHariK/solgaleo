import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";
import { JSX } from "solid-js";

/*CSS:

fieldset {
    display: inline-block;
    justify-content: space-between;
    border-radius: 0.5rem;
}

fieldset div {
    display: flex;
    align-items: center;
}

input[type="checkbox"], input[type="radio"] {
    --input-accent-color: var:#111827:#3473fc;
    accent-color: var(--input-accent-color);
    width: 1rem;
    height: 1rem;
    margin: .25rem;
}

input[type="checkbox"]:disabled, input[type="radio"]:disabled {
    cursor: not-allowed;
}

select {
    // display: block;
    // width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border-width: 1px;
    border-color: #D1D5DB;
    outline-style: none;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #111827;
    background-color: #ffffff;
}

label {
    color: var : #111827 : #9b51ef ;
    background: transparent;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    user-select: none;
    padding: 0.25rem;
}

label[aria-disabled="true"] {
    --label-disabled-color: var:#6B7280:#9CA3AF;
    color: var(--label-disabled-color);
    cursor: not-allowed;
    opacity: 0.75;
}

label p {
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 400;
    color: var : #6B7280 : #ae93cc;
}

*/

type CheckboxOption = {
    value: string;
    label: JSX.Element;
    helperText?: string;
    disabled?: boolean;
}

type CheckboxGroupProps = {
    id: string;
    header?: string;
    horizontal?: boolean;
    checkboxes: Array<CheckboxOption>;
    onChange?: (value: Set<string>) => void;
};

export function CheckboxGroup(props: CheckboxGroupProps) {
    const { state, handleChange } = useSpaceContext();

    return (
        <fieldset
            style={{
                display: props.horizontal ? "flex" : "",
            }}>

            {props.header && <legend>{props.header}</legend>}

            <Key each={props.checkboxes} by="value">
                {(option) => (
                    <div>
                        <input
                            id={option().value}
                            type="checkbox"
                            name={props.id}
                            value={option().value}
                            checked={new Set(state().values[props.id]).has(option().value) || false}
                            disabled={option().disabled}
                            onInput={() => {
                                let s = new Set<string>(state().values[props.id])
                                if (s.has(option().value)) {
                                    s.delete(option().value)
                                } else {
                                    s.add(option().value)
                                }
                                props.onChange?.(s)
                                handleChange(
                                    props.id,
                                    props.checkboxes.filter((c) => {
                                        return s.has(c.value);
                                    }).map((c) => c.value))
                            }}
                        />
                        <label aria-disabled={option().disabled} for={option().value} >
                            {option().label}
                            {option().helperText && (
                                <p id={`${option().value}-text`}>
                                    {option().helperText}
                                </p>
                            )}
                        </label>
                    </div>
                )}
            </Key>
        </fieldset>
    );
}

type RadioOption = {
    value: string;
    label: JSX.Element;
    helperText?: string;
    disabled?: boolean;
};

type RadioGroupProps = {
    id: string;
    header?: string;
    horizontal?: boolean;
    options: Array<RadioOption>;
    onChange?: (value: string) => void;
};

export function RadioGroup(props: RadioGroupProps) {
    const { state, handleChange } = useSpaceContext();

    return (
        <fieldset
            style={{
                display: props.horizontal ? "flex" : "",
            }}>

            {props.header && <legend>{props.header}</legend>}

            <Key each={props.options} by="value">
                {(option) => (
                    <div>
                        <input
                            id={`radio-${option().value}`}
                            type="radio"
                            name={props.id}
                            value={option().value}
                            checked={state().values[props.id] === option().value}
                            disabled={option().disabled}
                            onChange={(e) => {
                                handleChange(props.id, e.target.value)
                                props.onChange?.(e.target.value);
                            }}
                        />
                        <label aria-disabled={option().disabled} for={`radio-${option().value}`}>
                            {option().label}
                            {option().helperText && (
                                <p id={`${option().value}-text`}>
                                    {option().helperText}
                                </p>
                            )}
                        </label>
                    </div>
                )}
            </Key>
        </fieldset>
    );
}


type SelectOption = {
    value: string;
    label: string;
};

type SelectProps = {
    id: string;
    header?: string;
    options: Array<SelectOption>;
    disabled?: boolean;
};

export function Select(props: SelectProps) {
    const { state, handleChange } = useSpaceContext();

    return (
        <div>
            {props.header && <legend>{props.header}</legend>}

            <select
                id={props.id}
                name={props.id}
                value={state().values[props.id] || ""}
                disabled={props.disabled}
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
