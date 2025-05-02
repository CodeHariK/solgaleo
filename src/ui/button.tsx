/*CSS:
button, .IconButton, .MaterialButton, .OutlinedButton,
.MaterialRoundButton, .OutlinedRoundButton, .Tag {
    display: inline-flex;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    background: var(--surface);
    border: 1px solid transparent;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    user-select: none;
    cursor: pointer;
}

button:hover, .IconButton:hover, .MaterialButton:hover, .OutlinedButton:hover,
.MaterialRoundButton:hover, .OutlinedRoundButton:hover {
    opacity: 0.9;
    background: var(--surface);
}

button:disabled, .IconButton:disabled, .MaterialButton:disabled, .OutlinedButton:disabled,
.MaterialRoundButton:disabled, .OutlinedRoundButton:disabled {
    color: var(--disabled);
    background: var(--disabled-container);
    cursor: not-allowed;
}

.IconButton {
    sol(--icon-bg , var(--surface));
    sol(--icon-border-radius , 100rem);
    sol(--icon-border , 1px solid transparent);
    sol(--icon-hover-bg , var(--primary-container));

    padding: .5rem;
    background: var(--icon-bg);
    border-radius: var(--icon-border-radius);
}
.IconButton:hover {
    background: var(--icon-hover-bg);
}

.MaterialButton, .MaterialRoundButton {
    sol(--mat-bg , var(--primary-container));
    sol(--mat-color , var(--primary));
    sol(--mat-border , 1px solid transparent);
    sol(--mat-hover-bg , var(--primary-container));
    sol(--mat-hover-color , var(--primary));

    color: var(--mat-color);
    background: var(--mat-bg);
    border: var(--mat-border);
}
.MaterialButton:hover, .MaterialRoundButton:hover {
    color: var(--mat-hover-color);
    background: var(--mat-hover-bg);
}

.OutlinedButton, .OutlinedRoundButton {
    sol(--out-bg , transparent);
    sol(--out-color , var(--primary));
    sol(--out-border , 1px solid var(--primary-border));
    sol(--out-hover-bg , var(--primary-container));
    sol(--out-hover-color , var(--primary));

    color: var(--out-color);
    background: var(--out-bg);
    border: var(--out-border);
}
.OutlinedButton:hover, .OutlinedRoundButton:hover {
    color: var(--out-hover-color);
    background: var(--out-hover-bg);
}

.OutlinedRoundButton {
    border-radius: 2rem;
}
.MaterialRoundButton {
    border-radius: 2rem;
}
.GradientTag {
    background: linear-gradient(45deg, var(--primary-container), var(--secondary-container));
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
