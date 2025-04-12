import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";
import { createSignal, type JSX } from "solid-js";
import { IconKey, IconLock, IconUnlock } from "../svg/svg.tsx";

import { CssUI } from "./gen.ts";

/*CSS:

fieldset {
    border: none;
}

fieldset div {
    display: flex;
    align-items: center;
}

input[type="checkbox"], input[type="radio"] {
    --input-accent-color: var:#7a23b4:#7a23b4;
    accent-color: var(--input-accent-color, var(--primary));
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
    color: var(--primary);
    background-color: var(--surface);
}

label {
    color: var(--primary);
    background: transparent;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    user-select: none;
    padding: 0.25rem;
}

label[aria-disabled="true"] {
    --label-disabled-color: var:#6B7280:#9CA3AF;
    color: var(--label-disabled-color, var(--secondary));
    cursor: not-allowed;
    opacity: 0.75;
}

label p {
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 400;
    color: var(--secondary);
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
        <fieldset classList={{ "flex": props.horizontal }}>

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
                                <p>{option().helperText}</p>
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
        <fieldset classList={{ "flex": props.horizontal }}>
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
                                <p> {option().helperText} </p>
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
        <fieldset>
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
        </fieldset>
    );
}

/*CSS:

.Input {
    position: relative;
    --input-bg : var : #ffffff : #3b3b3b;
    background: var(--input-bg, var(--surface));
    // border: var : 1px solid var(--primary-container);
    // border-radius: var : 0.5rem;
    border-bottom: 2px solid var(--primary-container);

    >input, >textarea {
        width: 100%;
        padding: .5rem;

        font-size: 0.875rem;
        color: var(--primary);
        background: transparent;
        border: none;
        outline: none;
        resize: vertical;
    }

    > input:disabled, > textarea:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    > input:disabled ~ label, > textarea:disabled ~ label {
        opacity: 0.5;
    }

    > input::placeholder, > textarea::placeholder {
        color: var(--secondary);
    }
    [data-has-label="true"] > input::placeholder, [data-has-label="true"] > textarea::placeholder {
        color: transparent;
    }
    [data-has-icon="true"] > input ~ label, [data-has-icon="true"] > textarea ~ label {
        left : 3rem;
    }

    > input:focus::placeholder, > textarea:focus::placeholder {
        color: var(--primary);
        transition: color 0.2s ease-out;
    }

    label {
        position: absolute;
        top: 0rem;
        left: 1rem;
        color: var(--secondary);
        border: var : 1px solid transparent;
        font-size: 0.875rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        pointer-events: none;
        transition: all 0.2s ease-in-out;
        transform-origin: 0 0;
        align-self: anchor-center;
    }
    :has([data-has-icon="false"]) label {
        display: none;
    }
    > input:focus-within ~ label,
    > textarea:focus-within ~ label,
    > input:not(:placeholder-shown) ~ label,
    > textarea:not(:placeholder-shown) ~ label {

        --label-transform-x: 0.6rem;
        --label-transform-y: -1.0rem;
        --label-scale: 0.85;
        --input-label-focus-color: var(--primary);
        --input-label-focus-bg: var(--surface);

        transform: 
            translateX(var(--label-transform-x))
            translateY(var(--label-transform-y))
            scale(var(--label-scale));

        top: 0rem;
        left: 0rem;
        height: auto;
        opacity: 1;
        color: var(--input-label-focus-color);  
        background: var(--input-label-focus-bg);  
        align-self: auto;
    }
}

.InputIcon {
    pointer-events: none;
    padding-inline-start: 1rem;
}

.InputEnd {
    display: flex; 

    gap: .25rem;
    justify-content: space-around;

    background: var(--input-bg, inherit);

    cursor: pointer;
}
.InputEnd:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}

.ErrorTextInput {
    border-color: var(--error);
}

.ErrorText {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--error);
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background: var(--input-label-focus-color, #983daf);
    cursor: pointer;
    margin-top: -0.4rem;
}

input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.3rem;
    background: var(--primary);
    border-radius: 0.25rem;
}

.RangeValue {
    position: absolute;
    // top: -2rem;
    left: var(--value-left, 0);
    transform: translateX(-50%);
    background: var(--primary);
    color: var(--surface);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    pointer-events: none;
    // opacity: 0;
    transition: opacity 0.2s;
}

input[type="range"]:hover ~ .RangeValue,
input[type="range"]:focus ~ .RangeValue {
    opacity: 1;
}

*/

type InputProps = {
    name: string;
    type: "none" | "text" | "url" | "email" | "numeric" | "decimal" | "search" | "password" | "range" | "color" | "date" | "month" | "week" | "time" | "datetime-local";
    placeholder?: string;
    label?: string;
    header?: string;
    disabled?: boolean;
    readOnly?: boolean;
    pattern?: RegExp;
    icon?: JSX.Element;
    end?: JSX.Element[];

    textarea?: boolean;
    min?: number;
    max?: number;
    step?: number;
};

export function Input(props: InputProps) {
    const { state, handleChange } = useSpaceContext();
    const [showPassword, setShowPassword] = createSignal(false);

    const [rangeLeft, setRangeLeft] = createSignal("0%");

    const updateRangeValue = (input: HTMLInputElement) => {
        const value = parseFloat(input.value);
        const min = props.min ?? 0;
        const max = props.max ?? 100;
        const percent = ((value - min) / (max - min)) * 100;
        setRangeLeft(`${percent}%`);
    };

    return (
        <fieldset>

            {props.header && <legend>{props.header}</legend>}

            <div class={CssUI.Input}
                data-has-icon={!!(props.icon || props.type === "password")}
                data-has-label={!!props.label}
                data-is-range={props.type === "range"}
            >

                {(props.icon || props.type === "password") && (
                    <div
                        class={CssUI.InputIcon}
                    >
                        {props.icon ? props.icon : <IconKey />}
                    </div>
                )}

                {props.textarea ?

                    <textarea
                        name={props.name}
                        disabled={props.disabled}
                        readOnly={props.readOnly}
                        placeholder={props.placeholder || ''}
                        value={state().values[props.name] || ''}
                        onInput={(e) => {
                            if (!props.pattern || props.pattern.test(e.target.value)) {
                                handleChange(props.name, e.target.value)
                            } else {
                                handleChange(props.name, state().values[props.name])
                            }
                        }}
                        class={`${state().errors[props.name] ? CssUI.ErrorTextInput : ''}`}
                    />

                    :

                    <input
                        name={props.name}
                        type={props.type == "password" ? (showPassword() ? "text" : "password") : props.type}
                        disabled={props.disabled}
                        readOnly={props.readOnly}
                        placeholder={props.placeholder || ''}
                        value={state().values[props.name] ?? (props.type === "range" ? 0 : '')}
                        onInput={(e) => {
                            if (props.type === "range") {
                                updateRangeValue(e.currentTarget);
                            }
                            if (!props.pattern || props.pattern.test(e.target.value)) {
                                handleChange(props.name, e.target.value)
                            } else {
                                handleChange(props.name, state().values[props.name])
                            }
                        }}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                        class={`${state().errors[props.name] ? CssUI.ErrorTextInput : ''}`}
                    />
                }

                {props.type === "range" && (
                    <div
                        class={CssUI.RangeValue}
                        style={{ "--value-left": rangeLeft() }}
                    >
                        {state().values[props.name] || props.min || 0}
                    </div>
                )}

                {(props.type === "password" || props.end) && (
                    <div class={CssUI.InputEnd}>
                        <button
                            type="button"
                            class={CssUI.IconButton}
                            onClick={() => setShowPassword(!showPassword())}
                        >
                            {showPassword() ? <IconUnlock /> : <IconLock />}
                        </button>
                        {...props.end}
                    </div>
                )}

                {props.label && <label>{props.label}</label>}
            </div>

            {state().errors[props.name] &&
                <p aria-errormessage={state().errors[props.name]}
                    class={CssUI.ErrorText}>{state().errors[props.name]}
                </p>}
        </fieldset>
    );
}
