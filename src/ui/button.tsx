import { createSignal, JSX } from "solid-js";
import { CssUI } from "./gen";
import { IconDown } from "../svg/svg";

/*CSS:
button, .ButtonIcon, .ButtonMaterial, .ButtonOutlined,
.ButtonMaterialRound, .ButtonOutlinedRound {
    display: inline-flex;
    // line-height: 1;
    font-size: inherit;
    gap: 0.5rem;
    padding: var(--button-padding);
    align-items: center;
    justify-content: center;
    color: var(--primary);
    background: var(--surface-bg);
    border: var(--border) solid transparent;
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

button:disabled {
    color: var(--disabled);
    border: var(--border) solid var(--disabled);
    background: var(--disabled-bg);
    cursor: not-allowed;
}

.ButtonIcon, .ButtonIconPlain, .ButtonIconMaterial, .ButtonIconMaterialRev {
    // padding: var(--icon-padding);
    border-radius: 100rem;
    width: 2em;
    height: 2em;
}
.ButtonIconPlain {
    color: var(--surface);
    background: transparent;
}

.ButtonRev, .ButtonRoundRev {
    color: var(--body-bg);
    background: var(--body);
    border: var(--border) solid var(--body);
}

.ButtonMaterial, .ButtonMaterialRound, .ButtonIconMaterial {
    color: var(--body);
    background: var(--primary-bg);
    border: var(--border) solid transparent;
}
.ButtonMaterialRev, .ButtonMaterialRoundRev, .ButtonIconMaterialRev {
    color: var(--body-bg);
    background: var(--primary);
    border: var(--border) solid transparent;
}

.ButtonOutlined, .ButtonOutlinedRound {
    color: var(--primary);
    background: transparent;
    border: var(--border) solid var(--primary-border);
}
.ButtonOutlinedPlain, .ButtonOutlinedRoundPlain {
    color: var(--surface);
    background: transparent;
    border: var(--border) solid var(--surface-tint);
}

.ButtonRound, .ButtonRoundRev, .ButtonOutlinedRound, .ButtonOutlinedRoundPlain, .ButtonMaterialRound, .ButtonMaterialRoundRev, .ButtonErrorRound, .ButtonErrorOutlinedRound  {
    border-radius: .5rem;
}

.ButtonGradient {
    background: linear-gradient(45deg, var(--primary-bg), var(--secondary-bg));
    border-radius: 2rem;
    padding: .3rem .5rem; 
}

.ButtonError, .ButtonErrorRound {
    color: var(--error);
    background: var(--error-bg);
}
.ButtonActive, .ButtonActiveRound {
    color: var(--active);
    background: var(--active-bg);
}
    
.ButtonErrorOutlinedRound, .ButtonErrorOutlined {
    color: var(--error-bg);
    background: var(--body-bg);
    border: var(--border) solid var(--error-bg);
}


.ButtonElevated {
    color: var(--body);
    border: 1px solid var(--body-bg);
    border-radius: 4px;
    padding: 0.8em 2em;
    background: var(--body-bg);
    transition: 0.2s;
}

.ButtonElevated:hover {
    color: var(--primary);
    transform: translate(-0.25rem, -0.25rem);
    background: var(--primary-bg);
    box-shadow: 0.25rem 0.25rem var(--surface-bg);
}

.ButtonElevated:active {
    transform: translate(0);
    box-shadow: none;
}

*/

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
            class={hasError() ? CssUI.ButtonError : ""} // Apply error class if there's an error
        >
            {isLoading() ? "Loading..." : props.children}
        </button>
    );
};

/*CSS:

.selection-options {
    display: flex;
    border-top: var(--border) solid var(--surface-tint);
    border-bottom: var(--border) solid var(--surface-tint);
}

.option {
    flex: 1;
    padding: 16px 0;
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    color: var(--surface);
    border-left: var(--border) solid var(--surface-tint);
}

*/

export function Options(props: { style?: JSX.CSSProperties, buttonStyle?: JSX.CSSProperties }) {
    return <div class="selection-options" style={props.style}>

        <div class="option">COLOUR</div>

        <div class="option">
            <span>SIZE</span>
            <IconDown />
        </div>

    </div>;
}
