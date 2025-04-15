/*CSS:
button {
    display: inline-flex;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--primary);
    background: var(--surface-container);
    border: none;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    user-select: none;
    cursor: pointer;
}
button:hover {
    opacity: 0.9;
    background: var(--surface);
}

.IconButton {
    --icon-bg: var(--surface-container);
    --icon-border-radius: var : 100rem;
    --icon-border: none;
    --icon-hover-bg: var(--primary-container);

    padding: .5rem;
    background: var(--icon-bg);
    border-radius: var(--icon-border-radius);
}
.IconButton:hover {
    background: var(--icon-hover-bg);
}

.MaterialButton {
    --mat-bg: var(--primary-container);
    --mat-color: var(--primary);
    --mat-border: none;
    --mat-hover-bg: var(--primary-container);
    --mat-hover-color: var(--primary);

    color: var(--mat-color);
    background: var(--mat-bg);
    border: var(--mat-border);
}
.MaterialButton:hover {
    color: var(--mat-hover-color);
    background: var(--mat-hover-bg);
}

.OutlinedButton {
    --out-bg: transparent;
    --out-color: var(--primary);
    --out-border: 1px solid var(--primary);
    --out-hover-bg: var(--primary-container);
    --out-hover-color: var(--primary);

    color: var(--out-color);
    background: var(--out-bg);
    border: var(--out-border);
}
.OutlinedButton:hover {
    color: var(--out-hover-color);
    background: var(--out-hover-bg);
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
