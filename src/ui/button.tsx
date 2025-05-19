/*CSS:
button, .ButtonIcon, .ButtonMaterial, .ButtonOutlined,
.ButtonMaterialRound, .ButtonOutlinedRound, .Tag {
    display: inline-flex;
    line-height: 1;
    font-size: inherit;
    gap: 0.5rem;
    padding: 0.9rem 1rem;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    background: var(--surface-bg);
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

button:hover, .ButtonMaterial:hover, .ButtonMaterialRound:hover {
    background: var(--surface-bg) radial-gradient(circle, transparent 1%, var(--surface-bg) 1%) center/15000%;
}
.ButtonIcon:hover,  .ButtonOutlined:hover, .ButtonOutlinedRound:hover {
    color: var(--primary);
    background: var(--primary-bg) radial-gradient(circle, transparent 1%, var(--primary-bg) 1%) center/15000%;
}

button:active, .ButtonIcon:active, .ButtonMaterial:active, .ButtonOutlined:active,
.ButtonMaterialRound:active, .ButtonOutlinedRound:active {
    background-color: var(--surface);
    background-size: 100%;
    transition: background 0s;
}

button:disabled, .ButtonIcon:disabled, .ButtonMaterial:disabled, .ButtonOutlined:disabled,
.ButtonMaterialRound:disabled, .ButtonOutlinedRound:disabled {
    color: var(--disabled);
    background: var(--disabled-container);
    cursor: not-allowed;
}

.ButtonIcon, .ButtonIconPlain, .ButtonIconMaterial, .ButtonIconMaterialRev {
    padding: .5rem;
    border-radius: 100rem;
}
.ButtonIconPlain {
    color: inherit;
    background: transparent;
}

.ButtonRev, .ButtonRoundRev {
    color: var(--body-bg);
    background: var(--body);
    border: 1px solid var(--body);
}

.ButtonMaterial, .ButtonMaterialRound, .ButtonIconMaterial {
    color: var(--body);
    background: var(--primary-bg);
    border: 1px solid transparent;
}
.ButtonMaterialRev, .ButtonMaterialRoundRev, .ButtonIconMaterialRev {
    color: var(--body-bg);
    background: var(--primary);
    border: 1px solid transparent;
}

.ButtonOutlined, .ButtonOutlinedRound {
    color: var(--primary);
    background: transparent;
    border: 1px solid var(--primary-border);
}
.ButtonOutlinedPlain, .ButtonOutlinedRoundPlain {
    color: var(--surface);
    background: transparent;
    border: 1px solid var(--surface-tint);
}

.ButtonRound, .ButtonRoundRev, .ButtonOutlinedRound, .ButtonOutlinedRoundPlain, .ButtonMaterialRound, .ButtonMaterialRoundRev {
    border-radius: .5rem;
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
import { IconDown } from "../svg/svg";

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

/*CSS:

.selection-options {
    display: flex;
    border-top: 1px solid var(--surface-tint);
    border-bottom: 1px solid var(--surface-tint);
    margin-top: 16px;
}

.option {
    flex: 1;
    padding: 16px 0;
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    color: var(--surface);
    border-left: 1px solid var(--surface-tint);
}

*/

export function Options() {
    return <div class="selection-options">

        <div class="option">COLOUR</div>

        <div class="option">
            <span>SIZE</span>
            <IconDown />
        </div>

    </div>;
}
