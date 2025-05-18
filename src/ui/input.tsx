import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";
import { createSignal, onMount, type JSX } from "solid-js";
import { IconDown, IconKey, IconLock, IconUnlock } from "../svg/svg.tsx";
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

*/

function useLocalState() {
    const [values, setValues] = createSignal<Record<string, any>>({});
    const [errors, setErrors] = createSignal<Record<string, string>>({});

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

type CheckboxOption = {
    value: string;
    label: JSX.Element;
    helperText?: string;
    disabled?: boolean;
}

type CheckboxGroupProps = {
    name: string;
    header?: string;
    horizontal?: boolean;
    checkboxes: Array<CheckboxOption>;
    onChange?: (value: Set<string>) => void;
    setValue?: (value: Set<string>) => void;
    initialValue?: string[];
};

export function CheckboxGroup(props: CheckboxGroupProps) {
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
            props.setValue?.(new Set(props.initialValue));
        }
    });

    const handleCheckboxChange = (s: Set<string>) => {
        const values = props.checkboxes
            .filter((c) => s.has(c.value))
            .map((c) => c.value);
        handleChange(props.name, values);
        props.setValue?.(s);
        props.onChange?.(s);
    };

    return (
        <fieldset classList={{ "flex": props.horizontal }}>

            {props.header && <legend>{props.header}</legend>}

            <Key each={props.checkboxes} by="value">
                {(option) => (
                    <div>
                        <input
                            id={option().value}
                            name={props.name}
                            type="checkbox"
                            value={option().value}
                            checked={new Set(state().values[props.name]).has(option().value) || false}
                            disabled={option().disabled}
                            onInput={() => {
                                let s = new Set<string>(state().values[props.name])
                                if (s.has(option().value)) {
                                    s.delete(option().value)
                                } else {
                                    s.add(option().value)
                                }
                                handleCheckboxChange(s);
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
    name: string;
    header?: string;
    horizontal?: boolean;
    options: Array<RadioOption>;
    onChange?: (value: string) => void;
    setValue?: (value: string) => void;
    initialValue?: string;
};

export function RadioGroup(props: RadioGroupProps) {
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
                    <div>
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


type SelectOption = {
    value: string;
    label: string;
};

type SelectProps = {
    name: string;
    header?: string;
    options: Array<SelectOption>;
    disabled?: boolean;
    onChange?: (value: string) => void;
    setValue?: (value: string) => void;
    initialValue?: string;
};

export function Select(props: SelectProps) {
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

            <div>
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
                            <option value={option().value} >
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

interface ToggleSwitchProps {
    name: string;
    onChange?: (value: boolean) => void;
    setValue?: (value: boolean) => void;
    initialValue?: boolean;
}

export function ToggleSwitch(props: ToggleSwitchProps) {
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
        <fieldset>
            <div
                classList={{
                    [CssUI.ToggleChecked]: state().values[props.name],
                }}
                class={CssUI.ToggleSwitch}
                onClick={toggleValue}>
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
    setValue?: (value: any) => void;
    initialValue?: any;
};

export function Input(props: InputProps) {
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
        }
    };

    return (
        <fieldset>

            {props.header && <legend>{props.header}</legend>}

            <div class={CssUI.Input}
                data-has-icon={!!(props.icon || props.type === "password")}
                data-has-label={!!props.label}
                data-is-range={props.type === "range"}
                style={{ "--value-left": rangeLeft() }}
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

type FileUploaderProps = {
    name: string;
    header?: string;
    accept: string[];
    uploadFunc: (formdata: FormData) => Promise<{ valid: boolean, info: JSX.Element }>;
    initialValue?: File | string;
    setValue?: (value: string | File) => void;
};

export function FileUploader(props: FileUploaderProps) {
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

            <div class={CssUI.UploadContainer}>
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
    return false; // Return false if no patterns match
}
