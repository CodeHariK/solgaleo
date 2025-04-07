import { createSignal, type JSX } from "solid-js";
import { useSpaceContext } from "./spaceform";
import { KeyIcon, LockIcon, UnlockIcon } from "../svg/svg";

import { SolCSS } from "./input.gen.css.ts";

/*CSS:

.AppTextInput {
    --input-bg: var : #ffffff : #3b3b3b;
    --input-color: var : #111827 : #ffffff;
    --input-border: var : 1px solid #d1d5db : 1px solid #525252;
    --input-focus-border: var : #f69c3b : #525252;
    --input-focus-ring: var : #3b82f6 : #525252;
    --input-placeholder: var : #9ca3af : #737373;
    
    display: block;
    width: 100%;
    padding: 1rem;
    font-size: 0.875rem;
    color: var(--input-color);
    background: var(--input-bg);
    border: var(--input-border);
    border-radius: 0.5rem;
    outline: none;
    resize: vertical;

    [data-has-icon="true"] {
        padding-left: 2.75rem;
    }


    [data-is-range="true"] {
        cursor: pointer;
    }

    :focus {
        border-color: var(--input-focus-border);
        box-shadow: 0 0 0 1px var(--input-focus-ring);
    }

    :disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    ::placeholder {
        color: transparent;
    }

    :focus::placeholder {
        color: var(--input-placeholder);
        transition: color 0.2s ease-out;
    }
}

.AppTextInput:focus ~ .SolInputLabel,
.AppTextInput:not(:placeholder-shown) ~ .SolInputLabel {
    transform: 
        translateX(var(--label-transform-x))
        translateY(var(--label-transform-y))
        scale(var(--label-scale));

    background-color: var(--label-bg);
    padding: 0 0.25rem;
    left: 0.75rem;
    height: auto;
    opacity: 1;
    color: var(--input-focus-border);  
}

.AppTextInput[data-has-label="true"]:focus,
.AppTextInput[data-has-label="true"]:not(:placeholder-shown) {
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
}

.AppTextInput:disabled ~ .SolInputLabel {
    opacity: 0.5;
    pointer-events: none;
}

.AppErrorTextInput {
    border-color: #EF4444;
}

.AppErrorText {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #6B7280;
}

.SolInputIcon {
    display: flex; 
    position: absolute; 
    top: 0;
    bottom: 0;
    inset-inline-start: 0px;
    align-items: center; 
    pointer-events: none;
    padding-inline-start: 1rem;
}

.SolPasswordIcon {
    display: flex; 
    position: absolute; 
    top: 0;
    bottom: 0; 
    z-index: 20;
    inset-inline-end: 0px;
    padding-left: 0.75rem;
    padding-right: 0.75rem; 
    align-items: center; 
    cursor: pointer; 
}
.SolPasswordIcon:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}

.SolInputLabel {
    --label-color: var : #6B7280 : #A1A1AA;
    --label-padding: 1rem;
    --label-transform-x: 0.10rem;
    --label-transform-y: 0.15rem;
    --label-scale: 0.75;

    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: var(--label-padding);
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    border: 1px solid transparent;
    transform-origin: 0 0;
    color: var(--label-color);
}

.SolInputLabel[data-has-icon="true"] {
    --label-padding: 1rem; 
}

*/

type TextInputProps = {
    name: string;
    type: "none" | "text" | "url" | "email" | "numeric" | "decimal" | "search" | "password" | "range" | "color" | "date" | "month" | "week" | "time" | "datetime-local";
    placeholder?: string;
    label?: string;
    header?: string;
    disabled?: boolean;
    readOnly?: boolean;
    pattern?: RegExp;
    icon?: JSX.Element;

    area?: boolean;
    min?: number;
    max?: number;
    step?: number;
};

export function TextInput(props: TextInputProps) {
    const { state, handleChange } = useSpaceContext();
    const [showPassword, setShowPassword] = createSignal(false);

    return (
        <fieldset>

            {props.header && <legend>{props.header}</legend>}

            <div style={{ position: "relative" }}>

                {props.area ?

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
                        data-has-icon={!!(props.icon || props.type === "password")}
                        data-has-label={!!props.label}
                        class={`${SolCSS.AppTextInput} ${state().errors[props.name] ? SolCSS.AppErrorTextInput : ''}`}
                    />

                    :

                    <input
                        name={props.name}
                        type={props.type == "password" ? (showPassword() ? "text" : "password") : props.type}
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
                        min={props.min}
                        max={props.max}
                        step={props.step}
                        data-has-icon={!!(props.icon || props.type === "password")}
                        data-has-label={!!props.label}
                        data-is-range={props.type === "range"}
                        class={`${SolCSS.AppTextInput} ${state().errors[props.name] ? SolCSS.AppErrorTextInput : ''}`}
                    />
                }

                {props.label &&
                    <label
                        data-has-icon={!!(props.icon || props.type === "password")}
                        class={SolCSS.SolInputLabel}
                    >
                        {props.label}
                    </label>
                }

                {(props.icon || props.type === "password") && (
                    <div
                        class={SolCSS.SolInputIcon}
                    >
                        {props.icon ? props.icon : <KeyIcon />}
                    </div>
                )}


                {props.type === "password" && (
                    <button
                        type="button"
                        tabindex="-1"
                        onClick={() => setShowPassword(!showPassword())}
                        class={SolCSS.SolPasswordIcon}
                    >
                        {showPassword() ? <UnlockIcon /> : <LockIcon />}
                    </button>
                )}

            </div>

            {state().errors[props.name] &&
                <p aria-errormessage={state().errors[props.name]}
                    class={SolCSS.AppErrorText}>{state().errors[props.name]}
                </p>}
        </fieldset>
    );
}
