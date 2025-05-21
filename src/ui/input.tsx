import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";
import { createEffect, createSignal, onMount, Setter, Show, type JSX } from "solid-js";
import { IconCross, IconDown, IconKey, IconLock, IconUnlock } from "../svg/svg.tsx";
import { CssUI } from "./gen.ts";
import { Modal } from "../nav/modal.tsx";

/*CSS:

fieldset {
    border: none;
    padding: 0;
}

input[type="checkbox"], input[type="radio"] {
    sol(--input-accent-color , var(--primary));
    accent-color: var(--input-accent-color, var(--primary));
    width: 1rem;
    height: 1rem;
    margin: .25rem;
}

input[type="checkbox"]:disabled, input[type="radio"]:disabled {
    cursor: not-allowed;
}

select {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border-width: 1px;
    border-color: var(--primary-bg);
    outline-style: none;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--primary);
    background: var(--surface-bg);
    appearance: none;

    :disabled {
        cursor: not-allowed;
        opacity: 0.75;
    }

    :hover ~ .SelectChevron {
        transform: translateX(-150%) scale(1.2);
        transition: transform 0.15s ease;
    }
}

.SelectChevron {
    transform: translateX(-150%);
    align-self: center;
    width: 1.25rem;
    height: 1.25rem;
    pointer-events: none;
    color: var(--primary);
}

.Chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.Chip {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    border: 1px solid var(--primary);
    background: var(--surface-bg);
    color: var(--primary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.ChipSelected {
    background: var(--primary-bg);
    color: var(--primary);
}

.ChipDisabled {
    opacity: 0.5;
    cursor: not-allowed;
}

*/

function useLocalState() {
    const [values, setValues] = createSignal<Record<string, any>>({});
    const [errors, _setErrors] = createSignal<Record<string, string>>({});

    const handleChange = (name: string, value: any) => {
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const initializeValue = (name: string, value: any) => {
        setValues(prev => ({ ...prev, [name]: value }));
    };

    return {
        state: () => ({ values: values(), errors: errors() }),
        handleChange,
        initializeValue
    };
}

type Option = {
    value: string;
    label: JSX.Element;
    helperText?: string;
    disabled?: boolean;
}

export function CheckboxGroup(props: {
    name: string;
    header?: JSX.Element;
    style?: JSX.CSSProperties;
    inputStyle?: (index: number) => JSX.CSSProperties;
    options: Array<Option>;
    multiple?: boolean;
    onChange?: (value: Set<string>) => void;
    setValue?: (value: Set<string>) => void;
    initialValue?: string[];
    variant?: 'checkbox' | 'chip';
}) {
    let context;
    try {
        context = useSpaceContext();
    } catch {
        context = useLocalState();
    }

    const { state, handleChange, initializeValue } = context;

    const [highlightedIndex, setHighlightedIndex] = createSignal(-1)

    onMount(() => {
        if (props.initialValue !== undefined) {
            initializeValue(props.name, props.initialValue);
            props.setValue?.(new Set(props.initialValue));
        }
    });

    function onInput(option: Option) {
        return () => {
            if (option.disabled) return;
            let values = new Set<string>(state().values[props.name]);
            if (values.has(option.value)) {
                values.delete(option.value);
            } else {
                values.add(option.value);
            }
            if (!props.multiple) {
                values = !values.has(option.value) ? new Set<string>() : new Set<string>([option.value])
            }
            props.setValue?.(values);
            props.onChange?.(values);
            handleChange(props.name, values);
        };
    }

    function isOptionSelected(option: Option): boolean {
        return new Set(state().values[props.name]).has(option.value) || false;
    }

    return (
        <fieldset>

            {props.header && <legend>{props.header}</legend>}

            <div style={{ "display": "flex", "align-items": "center", ...props.style }}
                classList={{ [CssUI.Chips]: props.variant === 'chip' }}>
                <Key each={props.options} by="value">
                    {(option, index) => (
                        props.variant === 'chip' ? (
                            <div style={props.inputStyle?.(index())}
                                class={`${CssUI.Chip} 
                                    ${isOptionSelected(option()) ? CssUI.ChipSelected : ''} 
                                    ${option().disabled ? CssUI.ChipDisabled : ''}`
                                }
                            // onClick={onInput(option())}
                            >
                                {option().label}
                                <button
                                    type="button"
                                    class={CssUI.ButtonIconPlain}
                                    style={{ "font-size": ".7rem", padding: ".2rem", "margin-left": ".2rem" }}
                                    onClick={() => onInput(option())}
                                    aria-label={`Remove ${option().label}`}
                                >
                                    <IconCross />
                                </button>
                            </div>
                        ) : (
                            <div style={props.inputStyle?.(index())}
                                class={`p2 flex items-center gap4 ${!props.multiple && isOptionSelected(option()) ? "primary" : ""} ${highlightedIndex() === index() ? "surface-bg" : ""}`}
                                onMouseEnter={() => setHighlightedIndex(index())}
                                onMouseLeave={() => setHighlightedIndex(-1)}
                                onClick={onInput(option())}
                            >
                                <Show when={props.multiple}>
                                    <input
                                        id={option().value}
                                        name={props.name}
                                        type="checkbox"
                                        value={option().value}
                                        checked={isOptionSelected(option())}
                                        aria-selected={isOptionSelected(option())}
                                        disabled={option().disabled}
                                        role="option"
                                        onInput={onInput(option())}
                                    />
                                </Show>
                                <label aria-disabled={option().disabled} for={option().value} >
                                    {option().label}
                                    {option().helperText && (
                                        <p>{option().helperText}</p>
                                    )}
                                </label>
                            </div>
                        )
                    )}
                </Key>
            </div>
        </fieldset>
    );
}

/*CSS:

.select-trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    min-height: 46px;
}

.arrow {
    border: solid #666;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transition: transform 0.2s ease;
}

.arrow.down {
    transform: rotate(45deg);
    margin-top: -3px;
}

.arrow.up {
    transform: rotate(-135deg);
    margin-bottom: -3px;
}

*/

export function CustomSelect(props: {
    id: string;
    options: { label: string, value: string }[]
    multiple: boolean
    onChange: (value: any) => any;
}) {
    const [isOpen, setIsOpen] = createSignal(false)

    const [searchTerm, setSearchTerm] = createSignal("")
    const [selected, setSelected] = createSignal<Set<string>>(new Set())

    createEffect(() => {
        console.log(selected())
    })

    const filteredOptions = () => {
        if (!searchTerm()) return props.options
        const term = searchTerm().toLowerCase()
        return props.options.filter((option) => option.label.toLowerCase().includes(term))
    }

    const clearAll = (event) => {
        event.stopPropagation()
        props.onChange(props.multiple ? [] : "")
    }

    const modalVisibility = createSignal(false);

    return <Modal
        title="Hello"
        visibilitySignal={modalVisibility}
        anchor={{
            align: 'bottom',
            offset: 10,
            element: ([_, setRef], [, setVisibility]) => {
                return <div
                    ref={setRef} onClick={() => { setVisibility(true) }}
                    class={`select-trigger ${props.multiple ? "multi-select-trigger" : ""}`}
                    // onClick={toggleDropdown}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen()}
                    id={props.id}
                >
                    {/* <label for="single-select">Single Select:</label> */}

                    {props.multiple ? (
                        <div class="selected-tags">
                            {Array.from(selected().values()).length > 0 ? (
                                <>
                                    <CheckboxGroup
                                        name="hello"
                                        multiple={props.multiple}
                                        variant="chip"
                                        setValue={setSelected}
                                        options={props.options
                                            .filter((option) => selected().has(option.value))} />

                                </>
                            ) : (
                                <span class="surface-text">Select options...</span>
                            )}
                        </div>
                    ) : (
                        <span class="selected-text">{Array.from(selected().values()).toString()}</span>
                    )}

                    <div class="trigger-buttons">
                        {props.multiple && Array.from(selected().values()).length > 0 && (
                            <button type="button" class="clear-all" onClick={clearAll} aria-label="Clear all selections">
                                Clear
                            </button>
                        )}
                        <span class={`arrow ${isOpen() ? "up" : "down"}`}></span>
                    </div>
                </div>
            }
        }}

        child={(anchorRef) => {
            return <div class="border flex flex-col p4"
                style={{ width: `${anchorRef?.getBoundingClientRect().width}px`, "max-height": "200px" }}>

                <Input
                    name="Search"
                    type="search"
                    setValue={setSearchTerm}
                />

                <CheckboxGroup
                    name="hello"
                    multiple={props.multiple}
                    setValue={setSelected}
                    style={{ padding: ".5rem", "flex-direction": "column", "align-items": "start" }}
                    inputStyle={() => { return { "width": "100%" } }}
                    options={filteredOptions().filter((option) => { return option.value.includes(searchTerm()) })} />

            </div>;
        }}
    />
}

export function RadioGroup(props: {
    name: string;
    header?: JSX.Element;
    horizontal?: boolean;
    style?: JSX.CSSProperties;
    options: Array<Option>;
    onChange?: (value: string) => void;
    setValue?: (value: string) => void;
    initialValue?: string;
}) {
    let context;
    try {
        context = useSpaceContext();
    } catch {
        context = useLocalState();
    }

    const { state, handleChange, initializeValue } = context;

    onMount(() => {
        if (props.initialValue !== undefined) {
            initializeValue(props.name, props.initialValue);
            props.setValue?.(props.initialValue);
        }
    });

    return (
        <fieldset classList={{ "flex": props.horizontal }}>
            {props.header && <legend>{props.header}</legend>}

            <Key each={props.options} by="value">
                {(option) => (
                    <div style={{ "display": "flex", "align-items": "center", ...props.style }}>
                        <input
                            id={`radio-${option().value}`}
                            name={props.name}
                            type="radio"
                            value={option().value}
                            checked={state().values[props.name] === option().value}
                            disabled={option().disabled}
                            onChange={(e) => {
                                handleChange(props.name, e.target.value);
                                props.setValue?.(e.target.value);
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

export function Select(props: {
    name: string;
    header?: JSX.Element;
    options: Array<Option>;
    style?: JSX.CSSProperties;
    disabled?: boolean;
    onChange?: (value: string) => void;
    setValue?: (value: string) => void;
    initialValue?: string;
}) {
    let context;
    try {
        context = useSpaceContext();
    } catch {
        context = useLocalState();
    }

    const { state, handleChange, initializeValue } = context;

    onMount(() => {
        if (props.initialValue !== undefined) {
            initializeValue(props.name, props.initialValue);
            props.setValue?.(props.initialValue);
        }
    });

    return (
        <fieldset>
            {props.header && <legend>{props.header}</legend>}

            <div style={{ "display": "flex", "align-items": "center", ...props.style }}>
                <select
                    name={props.name}
                    value={state().values[props.name] || ""}
                    disabled={props.disabled}
                    onChange={
                        (e) => {
                            handleChange(props.name, e.target.value);
                            props.setValue?.(e.target.value);
                            props.onChange?.(e.target.value);
                        }
                    }
                >
                    <Key each={props.options} by="value">
                        {(option) => (
                            <option disabled={option().disabled} value={option().value} >
                                {option().label}
                            </option>
                        )}
                    </Key>
                </select>
                <IconDown className={CssUI.SelectChevron} />
            </div>
        </fieldset>
    );
}

/*CSS:
.ToggleSwitch {
    width: 60px;
    height: 30px;
    background: var(--surface-bg);
    border-radius: 15px;
    border: 1px solid var(--primary);
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
}

.ToggleThumb {
    width: 26px;
    height: 26px;
    background-color: var(--primary);
    border-radius: 50%;
    position: absolute;
    margin-left: 2px;
    transition: transform 0.3s;
}

.ToggleChecked .ToggleThumb {
    transform: translateX(28px); 
}

.ToggleChecked {
    background: var(--primary-bg);
}

*/

export function ToggleSwitch(props: {
    name: string;
    style?: JSX.CSSProperties;
    header?: JSX.Element;
    onChange?: (value: boolean) => void;
    setValue?: (value: boolean) => void;
    initialValue?: boolean;
}) {
    let context;
    try {
        context = useSpaceContext();
    } catch {
        context = useLocalState();
    }

    const { state, handleChange, initializeValue } = context;

    onMount(() => {
        if (props.initialValue !== undefined) {
            initializeValue(props.name, props.initialValue);
            props.setValue?.(props.initialValue);
        }
    });

    const toggleValue = () => {
        const newValue = !state().values[props.name];
        handleChange(props.name, newValue);
        props.setValue?.(newValue);
        props.onChange?.(newValue);
    };

    return (
        <fieldset style={props.style}>
            {props.header && <legend style={{ display: "contents" }}>{props.header}</legend>}

            <div style={{ "display": "flex", "align-items": "center" }}
                classList={{
                    [CssUI.ToggleChecked]: state().values[props.name],
                }}
                class={CssUI.ToggleSwitch}
                onClick={toggleValue}
            >
                <div class={CssUI.ToggleThumb}></div>
            </div>
        </fieldset>
    );
}

/*CSS:

.Input {
    position: relative;
    background: sol(sol(--input-bg , #ffffff , #3b3b3b), var(--surface-bg));
    // border: 1px solid var(--primary-bg);
    // border-radius: 0.5rem;
    border-bottom: 2px solid var(--primary-bg);

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
        color: var(--primary);
    }
    // [data-has-label="true"] > input::placeholder, [data-has-label="true"] > textarea::placeholder {
    //     color: transparent;
    // }
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
        color: transparent;
        border: 1px solid transparent;
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

    :has(input[type="range"]) {
        margin: 0rem 1rem;
    }

    > input:focus-within ~ label,
    > textarea:focus-within ~ label,
    > input:not(:placeholder-shown) ~ label,
    > textarea:not(:placeholder-shown) ~ label {

        --label-transform-x: 0.6rem;
        --label-transform-y: -1.0rem;
        --label-scale: 0.85;
        --input-label-focus-color: var(--primary);
        --input-label-focus-bg: transparent;

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
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--error);
}

input[type="range"] {
    padding: 0;
    -webkit-appearance: none;
    border-radius: 50%;
    cursor: pointer;
}

.Input[data-is-range="true"] {
    border-bottom: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    margin-top: -0.25rem;
}

input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.5rem;
    // background: var(--primary);
    border-radius: 0.25rem;
        background: linear-gradient(
        to right,
        var(--primary) 0%,
        var(--primary) var(--value-left, 0%),
        var(--primary-bg) var(--value-left, 0%),
        var(--primary-bg) 100%
    );
}

.RangeValue {
    position: absolute;
    // top: -2rem;
    left: var(--value-left, 0);
    transform: translateX(-50%);
    background: var(--secondary-bg);
    color: var(--secondary);
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

export function Input(props: {
    name: string;
    type: "none" | "text" | "url" | "email" | "numeric" | "decimal" | "search" | "password" | "range" | "color" | "date" | "month" | "week" | "time" | "datetime-local";
    placeholder?: string;
    label?: string;
    header?: JSX.Element;
    disabled?: boolean;
    readOnly?: boolean;
    pattern?: RegExp;
    icon?: JSX.Element;
    end?: JSX.Element[];
    style?: JSX.CSSProperties;
    inputStyle?: JSX.CSSProperties;

    onChange?: (value: any) => void;
    onFocus?: (e: FocusEvent) => void;

    ref?: Setter<HTMLButtonElement>

    textarea?: boolean;
    min?: number;
    max?: number;
    step?: number;
    setValue?: (value: any) => void;
    initialValue?: any;
}) {
    let context;
    try {
        context = useSpaceContext();
    } catch {
        context = useLocalState();
    }

    const { state, handleChange, initializeValue } = context;
    const [showPassword, setShowPassword] = createSignal(false);

    const [rangeLeft, setRangeLeft] = createSignal((state().values[props.name] ?? 0) + "%");

    onMount(() => {
        if (props.initialValue !== undefined) {
            initializeValue(props.name, props.initialValue);
            props.setValue?.(props.initialValue);
        }
    });

    const updateRangeValue = (input: HTMLInputElement) => {
        const value = parseFloat(input.value);
        const min = props.min ?? 0;
        const max = props.max ?? 100;
        const percent = ((value - min) / (max - min)) * 100;
        setRangeLeft(`${percent}%`);
    };

    const handleInputChange = (value: any) => {
        if (!props.pattern || props.pattern.test(value)) {
            handleChange(props.name, value);
            props.setValue?.(value);
            props.onChange?.(value)
        }
    };

    return (
        <fieldset style={props.style}>

            {props.header && <legend>{props.header}</legend>}

            <div style={{ "--value-left": rangeLeft(), "display": "flex", "align-items": "center", ...props.inputStyle }}
                class={CssUI.Input}
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
                            handleInputChange(e.target.value);
                        }}
                        onFocus={props.onFocus}
                        ref={props.ref}
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
                            handleInputChange(e.target.value);
                            if (props.type === "range") {
                                updateRangeValue(e.currentTarget);
                            }
                        }}
                        onFocus={props.onFocus}
                        ref={props.ref}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                        class={`${state().errors[props.name] ? CssUI.ErrorTextInput : ''}`}
                    />
                }

                {props.type === "range" && (
                    <div class={CssUI.RangeValue}>
                        {state().values[props.name] || props.min || 0}
                    </div>
                )}

                {(props.type === "password" || props.end) && (
                    <div class={CssUI.InputEnd}>
                        <button
                            type="button"
                            class={CssUI.ButtonIconPlain}
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

/*CSS:
.UploadContainer {
    // display: inline-block;
    border: 2px dashed var(--primary);
    margin: 0.5rem;
    border-radius: 1rem;
    padding: 1rem;
    flex-direction: column;
    align-items: baseline;
    width: max-content;
}

.Dropzone {
    min-height: 250px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
}
.DropzoneDragging {
    background: var(--surface-bg);
}

.ImagePreview {
    // width: 100%;
    height: auto;
    flex-shrink: 0;
    display: block;
    margin: 0 auto;
}
.ImagePreviewInvalid {
    filter: blur(8px);
}

.InvalidMessage {
    position: absolute;
    color: var(--surface);
    background: var(--primary);
    padding: 0.5rem;
    border-radius: 0.25rem;
}

.HiddenInput {
    display: none;
}
*/

export function FileUploader(props: {
    name: string;
    header?: JSX.Element;
    accept: string[];
    style?: JSX.CSSProperties;
    uploadFunc: (formdata: FormData) => Promise<{ valid: boolean, info: JSX.Element }>;
    initialValue?: File | string;
    setValue?: (value: string | File) => void;
}) {
    let context;
    try {
        context = useSpaceContext();
    } catch {
        context = useLocalState();
    }

    const { state, handleChange, initializeValue } = context;

    const [fileValid, setFildValid] = createSignal(true);
    const [fileInfo, setFileInfo] = createSignal<JSX.Element>();
    const [imageSrc, setImageSrc] = createSignal('');
    const [isDragging, setIsDragging] = createSignal(false);
    const [fileInputRef, setFileInputRef] = createSignal<HTMLInputElement | null>(null);

    onMount(() => {
        if (props.initialValue !== undefined) {
            initializeValue(props.name, props.initialValue);
            props.setValue?.(props.initialValue);

            // If initial value is a File or URL, also set the image preview
            if (props.initialValue instanceof File) {
                const reader = new FileReader();
                reader.readAsDataURL(props.initialValue);
                reader.onload = () => setImageSrc(reader.result as string);
            } else if (typeof props.initialValue === 'string') {
                setImageSrc(props.initialValue);
            }
        }
    });

    const uploadFile = async () => {
        const formData = state().values[props.name];
        if (!formData) {
            alert('Please select a file.');
            return;
        }

        try {
            let { valid, info } = await props.uploadFunc(formData)
            setFildValid(valid)
            setFileInfo(info)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    function handleFormData(file: File | string) {
        const formData = new FormData();

        if (file instanceof File) {
            formData.append('file', file);
        } else if (typeof file === "string") {
            if (file.startsWith("data:image")) {
                formData.append('data', file);
            } else {
                formData.append('url', file);
            }
        }

        formData.forEach((_value, key) => {
            console.log(key, _value)
        })

        handleChange(props.name, formData);
    }

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        setIsDragging(false);

        setFildValid(true)

        const items = event.dataTransfer?.items;

        // for (let i = 0; i < items.length; i++) {
        //     console.log(items[i], items[i].kind, items[i].type)
        // }

        if (items && items[0].kind === 'file') {
            // os file drag
            const file = items[0].getAsFile();
            console.log(file.type)
            if (file && startsWithPattern(file.type, props.accept)) {
                if (startsWithPattern(file.type, ["image/"])) {
                    setImageSrc(URL.createObjectURL(file));
                }
                handleFormData(file);
            }
        } else {
            // browser file drag
            const url = event.dataTransfer?.getData('text/uri-list');
            if (url) {
                setImageSrc(url);

                handleFormData(url);
            }
        }
    };

    const handleFileInputChange = (event: Event) => {
        setFildValid(true)

        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageSrc(reader.result as string);

                handleFormData(file);
            };

            // Reset the input value to allow the same file to be uploaded again
            target.value = '';
        }
    };

    return (
        <fieldset>
            {props.header && <legend>{props.header}</legend>}

            <div style={{ ...props.style }} class={CssUI.UploadContainer}>
                <div
                    class={`${CssUI.Dropzone} ${isDragging() ? CssUI.DropzoneDragging : ''}`}
                    onDragOver={(event) => {
                        event.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => { fileInputRef()?.click() }}
                >
                    {!imageSrc() ? (
                        "Drag and drop an image here"
                    ) : (
                        <img
                            class={`${CssUI.ImagePreview} ${!fileValid() ? CssUI.ImagePreviewInvalid : ''}`}
                            src={imageSrc()}
                            onChange={(_) => {
                                setFildValid(true)
                            }}
                            onError={(_) => {
                                setFildValid(false)
                            }}
                        />
                    )}
                    {(imageSrc() && !fileValid()) && (
                        <div class={CssUI.InvalidMessage}>Image not valid</div>
                    )}
                </div>

                {state().values[props.name] &&
                    (() => {
                        const file = state().values[props.name].get('file') as File;

                        if (!file) return

                        return <>
                            <p>Name: {file.name}</p>
                            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                            <p>Type: {file.type}</p>
                            <p>Last Modified: {new Date(file.lastModified).toLocaleString()}</p>
                        </>
                    })()
                }

                {fileInfo()}

                <input
                    name={props.name}
                    type="file"
                    accept={props.accept.join(",")}
                    class={CssUI.HiddenInput}
                    ref={setFileInputRef}
                    onChange={handleFileInputChange}
                />
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        if (imageSrc()) {
                            uploadFile();
                        } else {
                            fileInputRef()?.click();
                        }
                    }}
                >
                    {imageSrc() ? 'Upload' : 'Select'}
                </button>
            </div>
        </fieldset>
    );
};

function startsWithPattern(inputString: string, patterns: string[]) {
    for (const pattern of patterns) {
        // Convert the string pattern to a RegExp object
        const regex = new RegExp('^' + pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));

        // Test the input string against the regex
        if (regex.test(inputString)) {
            return true; // Return true if there's a match
        }
    }
    return false;
}
