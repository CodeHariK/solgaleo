/*CSS:
button, .IconButton, .MaterialButton, .OutlinedButton,
.MaterialRoundButton, .OutlinedRoundButton, .Tag {
    all: unset;
    display: inline-flex;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    align-items: center;
    justify-content: center;
    // color: var(--primary);
    // background: var(--surface-bg);
    border: 1px solid transparent;
    user-select: none;
    cursor: pointer;
    
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.6s;
}
button:focus {
    outline: none;
}

button:hover, .MaterialButton:hover, .MaterialRoundButton:hover {
    background: var(--surface-bg) radial-gradient(circle, transparent 1%, var(--surface-bg) 1%) center/15000%;
}
.IconButton:hover,  .OutlinedButton:hover, .OutlinedRoundButton:hover {
    color: var(--primary);
    background: var(--primary-bg) radial-gradient(circle, transparent 1%, var(--primary-bg) 1%) center/15000%;
}

button:active, .IconButton:active, .MaterialButton:active, .OutlinedButton:active,
.MaterialRoundButton:active, .OutlinedRoundButton:active {
    background-color: var(--surface);
    background-size: 100%;
    transition: background 0s;
}


button:disabled, .IconButton:disabled, .MaterialButton:disabled, .OutlinedButton:disabled,
.MaterialRoundButton:disabled, .OutlinedRoundButton:disabled {
    color: var(--disabled);
    background: var(--disabled-container);
    cursor: not-allowed;
}

.IconButton {
    padding: .5rem;
    border-radius: 100rem;
}

.IconButtonPlain {
    padding: .5rem;
    color: inherit;
    background: transparent;
    border-radius: 100rem;
}

.MaterialButton, .MaterialRoundButton {
    color: var(--primary);
    background: var(--primary-bg);
    border: 1px solid transparent;
}

.OutlinedButton, .OutlinedRoundButton {
    color: var(--primary);
    background: transparent;
    border: 1px solid var(--primary-border);
}

.OutlinedRoundButton {
    border-radius: 2rem;
}
.MaterialRoundButton {
    border-radius: 2rem;
}

.GradientTag {
    background: linear-gradient(45deg, var(--primary-bg), var(--secondary-bg));
    border-radius: 2rem;
    padding: .3rem .5rem; 
}

.ErrorButton {
    color: var(--error);
    background: var(--error-container);
}

*/


import { createSignal, JSX } from "solid-js";
import { CssUI } from "./gen";

interface AsyncButtonProps {
    onClick: () => Promise<void>; // Async function to be executed
    children: JSX.Element; // Button content
}

export function AsyncButton(props: AsyncButtonProps) {
    const [isLoading, setIsLoading] = createSignal(false);
    const [hasError, setHasError] = createSignal(false);

    const handleClick = async () => {
        setIsLoading(true);
        setHasError(false); // Reset error state before the async call
        try {
            await props.onClick(); // Call the async function
        } catch (error) {
            console.error(error); // Log the error
            setHasError(true); // Set error state
        } finally {
            setIsLoading(false); // Always reset loading state
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading()} // Disable button while loading
            class={hasError() ? CssUI.ErrorButton : ""} // Apply error class if there's an error
        >
            {isLoading() ? "Loading..." : props.children}
        </button>
    );
};
