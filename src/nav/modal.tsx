// import { createSignal, Setter } from "solid-js";
// import { IconCross } from "../svg/svg";

import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import { CssNAV } from "./gen";


import { type JSX } from 'solid-js';

/* CSS:
.ModalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    z-index: 50;
}

.ModalOverlay.Show {
    opacity: 1;
}

.ModalContent {
    background: var : purple;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.9);
    opacity: 0;
    transition: all 0.2s ease-in-out;


    position: relative;
    max-width: min(90vw, var(--modal-max-width, 600px));
    max-height: min(90vh, var(--modal-max-height, 800px));
}

.ModalContent.Show {
    transform: scale(1);
    opacity: 1;
}

.ModalPositioned {
    position: fixed;
    transform-origin: center;
}

.ModalClose {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: none;
    background: red;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.25rem;
    transition: background 0.2s;
}

.ModalClose:hover {
    background: rgba(0, 0, 0, 0.1);
}




.ModalFade {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.ModalSlide {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease-in-out;
}

.ModalScale {
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.3s ease-in-out;
}

.Show.ModalFade {
    opacity: 1;
}

.Show.ModalSlide {
    opacity: 1;
    transform: translateY(0);
}

.Show.ModalScale {
    opacity: 1;
    transform: scale(1);
}

*/

type AnimationType = 'fade' | 'slide' | 'scale';

type Position = {
    x?: number | string;
    y?: number | string;
    align?: 'leftcenter' | 'topcenter';
};

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: JSX.Element;
    title?: string;
    position?: Position;
    animation?: AnimationType;
};

export function Modal(props: ModalProps) {
    const [isVisible, setIsVisible] = createSignal(false);

    let modalRef!: HTMLDivElement;

    const animation = props.animation || 'scale';

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") props.onClose();
    };

    // Handle scroll lock
    const lockScroll = () => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    };

    const unlockScroll = () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    };

    // Check and adjust position to stay within bounds
    const adjustPosition = (styles: JSX.CSSProperties) => {
        if (!modalRef || !props.position) return styles;

        const modal = modalRef;
        if (!modal) return styles;

        const rect = modal.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let left = parseFloat(styles.left as string);
        let top = parseFloat(styles.top as string);

        // Adjust horizontal position
        if (left + rect.width > windowWidth) {
            left = windowWidth - rect.width - 20;
        }
        if (left < 0) left = 20;

        // Adjust vertical position
        if (top + rect.height > windowHeight) {
            top = windowHeight - rect.height - 20;
        }
        if (top < 0) top = 20;

        return {
            ...styles,
            left: `${left}px`,
            top: `${top}px`
        };
    };

    createEffect(() => {
        if (props.isOpen) {
            document.addEventListener("keydown", handleEscape);
            // Delay to trigger animation
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            unlockScroll();
            document.removeEventListener("keydown", handleEscape);
        }
    });

    onCleanup(() => {
        unlockScroll();
        document.removeEventListener("keydown", handleEscape);
    });

    const getPositionStyles = () => {
        if (!props.position) return {};

        let styles: JSX.CSSProperties = {
            left: typeof props.position.x === 'number' ? `${props.position.x}px` : props.position.x || '50%',
            top: typeof props.position.y === 'number' ? `${props.position.y}px` : props.position.y || '0',
        };

        if (props.position.align === 'leftcenter') {
            styles.transform = 'translateY(-50%)'
        } else if (props.position.align === 'topcenter') {
            styles.transform = 'translateX(-50%)'
        }

        return styles;
    };

    return (
        <Show when={props.isOpen}>
            <Portal>
                <div class={`${CssNAV.ModalOverlay} ${isVisible() ? CssNAV.Show : ''}`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) props.onClose();
                    }}
                >
                    <div
                        ref={modalRef}
                        class={`
                            ${CssNAV.ModalContent}
                            ${isVisible() ? CssNAV.Show : ''}
                            ${props.position ? CssNAV.ModalPositioned : ''}
                            ${CssNAV[`Modal${animation.charAt(0).toUpperCase() + animation.slice(1)}`]}
                        `}
                        style={adjustPosition(getPositionStyles())}
                    >
                        <button
                            class={CssNAV.ModalClose}
                            onClick={props.onClose}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                        {props.title && <h2>{props.title}</h2>}
                        {props.children}
                    </div>
                </div>
            </Portal>
        </Show>
    );
}
