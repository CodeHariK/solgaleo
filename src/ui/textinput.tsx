import { createSignal, type JSX } from "solid-js";
import { useSpaceContext } from "./spaceform.tsx";
import { IconKey, IconLock, IconUnlock } from "../svg/svg.tsx";

import { SolCSS } from "./gen.ts";

/*CSS:

.AppTextInput {
    display: block;
    width: 100%;
    padding: 1rem;
    font-size: 0.875rem;
    color: var : #111827 : #ffffff;
    background: var : #ffffff : #3b3b3b;
    border: var : 1px solid #d1d5db : 1px solid #525252;
    border-radius: var : 0.5rem;
    outline: none;
    resize: vertical;

    [data-has-icon="true"] {
        padding-left: 2.75rem;
    }

    [data-is-range="true"] {
        cursor: pointer;
    }

    :focus {
        border-color: var : #8d40ec : #8d40ec;
        box-shadow: var : 2px 3px 1px #c4ced1 : 2px 3px 1px #c4ced1;
    }

    :disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    :disabled ~ .SolInputLabel {
        opacity: 0.5;
    }

    [data-has-label="true"]::placeholder {
        color: transparent;
    }
    [data-has-label="false"]::placeholder {
        color: var : #9ca3af : #737373;
    }
    :focus::placeholder {
        color: var : #ae81e4 : #737373;
        transition: color 0.2s ease-out;
    }

    [data-has-icon="true"] ~ .SolInputLabel {
        left : 2rem;
    }

    :focus ~ .SolInputLabel,
    :not(:placeholder-shown) ~ .SolInputLabel {

        --label-transform-x: 0.6rem;
        --label-transform-y: -1.0rem;
        --label-scale: 0.85;
        --input-label-focus-color: #983daf;
        --input-label-focus-bg: white;

        transform: 
            translateX(var(--label-transform-x))
            translateY(var(--label-transform-y))
            scale(var(--label-scale));

        left: 0rem;
        height: auto;
        opacity: 1;
        color: var(--input-label-focus-color);  
        background: var(--input-label-focus-bg);  
        align-self: auto;
    }
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
    // z-index: 20;
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
    position: absolute;
    top: 0;
    margin: 0.25rem;
    padding: 0.25rem;
    color: var : #6B7280 : #A1A1AA;
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
                        {props.icon ? props.icon : <IconKey />}
                    </div>
                )}

                {props.type === "password" && (
                    <button
                        type="button"
                        tabindex="-1"
                        onClick={() => setShowPassword(!showPassword())}
                        class={SolCSS.SolPasswordIcon}
                    >
                        {showPassword() ? <IconUnlock /> : <IconLock />}
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
