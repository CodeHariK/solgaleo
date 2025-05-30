import { createSignal, createContext, useContext, Show, type JSX } from 'solid-js';
import { ObjectSchema } from 'yup';
import { CssUI } from './gen';

export type SpaceState = {
    values: Record<string, any>; // Use appropriate types for your form values
    errors: Record<string, string>; // Map of field names to error messages
    status: Record<string, string>; // Map of field names to status messages
    formerror: string; // General form error message
};

// Define the type for the context value
type SpaceContextType = {
    id: string;
    state: () => SpaceState;
    handleChange: (name: string, value: any) => void;
};

// Create the context with a default value
const SpaceContext = createContext<SpaceContextType | undefined>(undefined);

// Custom hook to use the form context
export const useSpaceContext = () => {
    const context = useContext(SpaceContext);
    if (!context) {
        throw new Error("useSpaceContext must be used within a SpaceProvider");
    }
    return context;
};

type SpaceFormProps = {
    id: string;
    initialFormState?: SpaceState;
    schema?: ObjectSchema<any>;
    onSubmit?: (state: Record<string, any>) => void;
    children: JSX.Element;
    class?: string;
};

export function SpaceForm(props: SpaceFormProps) {
    const [state, setState] = createSignal<SpaceState>(props.initialFormState ?? {
        values: {},
        status: {},
        errors: {},
        formerror: ""
    });

    const [startValidation, setStartValidation] = createSignal<boolean>(false);

    const handleChange = async (name: string, value: any) => {
        setState(prev => ({
            ...prev,
            values: {
                ...prev.values,
                [name]: value,
            }
        }));
        if (startValidation()) {
            await validateForm();
        }
    };

    const validateForm = async () => {
        try {
            await props.schema?.validate(state().values, { abortEarly: false });
            setState(prev => ({ ...prev, errors: {}, formerror: "" }));
            return true;
        } catch (err: any) {
            const validationErrors: Record<string, string> = {};
            err.inner.forEach(({ path, message }: { path: string; message: string }) => {
                validationErrors[path] = message;
            });
            setState(prev => ({ ...prev, errors: validationErrors, formerror: "" }));
            return false;
        }
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const isValid = await validateForm();
        setStartValidation(true)
        if (isValid) {
            props.onSubmit?.(state().values);
        } else {
            // Handle a general form error
            setState(prev => ({ ...prev, formerror: "Please correct the errors below." }));
        }
    };

    const handleReset = async () => {
        setState({
            values: {},
            errors: {},
            status: {},
            formerror: ""
        });
    };

    return (
        <SpaceContext.Provider value={{ id: props.id, state: state, handleChange }}>
            <form onSubmit={handleSubmit} onReset={handleReset} class={props.class}>
                <Show when={state().formerror}>
                    <p class="AppErrorText">{state().formerror}</p>
                </Show>
                {props.children}
            </form>
        </SpaceContext.Provider>
    );
}

function serializeRecord(record: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(record)) {
        if (value instanceof Set) {
            result[key] = Array.from(value); // Convert Set to Array
        } else if (typeof value === 'object' && value !== null) {
            result[key] = serializeRecord(value); // Recursively serialize nested objects
        } else {
            result[key] = value; // Copy primitive values
        }
    }
    return result;
}

export function SpaceDebugInfo() {
    const { state } = useSpaceContext();

    return (
        <div class="m2 border-basic p4 br8">
            <h5>Spaceform debug info</h5>
            <hr />
            <pre>
                {JSON.stringify(serializeRecord(state()), null, 2)}
            </pre>
        </div>
    );
}

export function SpaceFormError() {
    const context = useSpaceContext();

    if (!context) {
        throw new Error("TextInput must be used within a FormProvider");
    }

    const { state } = context;

    return (
        <div class={CssUI.ErrorText}>{state().formerror}</div>
    );
}