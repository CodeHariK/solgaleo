// import { createSignal, Setter } from "solid-js";
// import { IconCross } from "../svg/svg";

import { Accessor, Setter, Show, createEffect, createSignal, onCleanup } from "solid-js";
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
    // background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    z-index: 50;
    
    pointer-events: none;
}

.ModalOverlay.Show {
    opacity: 1;
}

.ModalContent {
    background: var : #4d84dc40;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    // transform: scale(0.9);
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



.ModalContent[data-position="top"]::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid var(--modal-bg, white);
}

.ModalContent[data-position="bottom"]::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--modal-bg, white);
}

.ModalContent[data-position="left"]::after {
    content: '';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid var(--modal-bg, white);
}

.ModalContent[data-position="right"]::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--modal-bg, white);
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
    // transform: scale(0.9);
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

type AnchorAlign = 'top' | 'bottom' | 'left' | 'right';

type CornerPosition = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';


type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: JSX.Element;
    title?: string;
    animation?: AnimationType;

    fixed?: {
        x: number | string;
        y: number | string;
        corner?: CornerPosition;
    },
    anchor?: {
        element: (anchorRef: Accessor<HTMLButtonElement>, setAnchorRef: Setter<HTMLButtonElement>) => JSX.Element,
        align?: AnchorAlign;
        offset?: number;
    };
};

export function Modal(props: ModalProps) {
    const [isVisible, setIsVisible] = createSignal(false);

    let modalRef!: HTMLDivElement;

    const [anchorRef, setAnchorRef] = createSignal<HTMLButtonElement>();

    const [position, setPosition] = createSignal<JSX.CSSProperties>({});

    const animation = props.animation || 'scale';

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") props.onClose();
    };

    // Handle scroll lock
    // const lockScroll = () => {
    //     document.body.style.overflow = 'hidden';
    //     document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    // };

    const unlockScroll = () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    };

    const handleViewportChange = () => {
        setPosition(adjustPosition(getPosition()));
    };

    createEffect(() => {
        if (props.isOpen) {
            setPosition(adjustPosition(getPosition()));
            document.addEventListener("keydown", handleEscape);
            window.addEventListener("resize", handleViewportChange);
            window.addEventListener("scroll", handleViewportChange);
            // Delay to trigger animation
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            unlockScroll();
            document.removeEventListener("keydown", handleEscape);
            window.removeEventListener("resize", handleViewportChange);
            window.removeEventListener("scroll", handleViewportChange);
        }


        const anchor = anchorRef();
        // if (!anchor || !props.isOpen) return;

        console.log(anchor)

        // Watch for size changes
        const resizeObserver = new ResizeObserver(() => {
            handleViewportChange();
        });

        // Watch for position/attribute changes
        const mutationObserver = new MutationObserver((mutations) => {
            const hasPositionChange = mutations.some(mutation =>
                mutation.type === 'attributes' &&
                (mutation.attributeName === 'style' ||
                    mutation.attributeName === 'class')
            );
            console.log("Mutation", anchor.style.left, anchor.style.top, hasPositionChange)
            if (hasPositionChange) {
                handleViewportChange();
            }
        });

        // Start observing
        resizeObserver.observe(anchor);
        mutationObserver.observe(anchor, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        // Cleanup
        onCleanup(() => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        });
    });

    onCleanup(() => {
        unlockScroll();
        document.removeEventListener("keydown", handleEscape);
        window.removeEventListener("resize", handleViewportChange);
        window.removeEventListener("scroll", handleViewportChange);
    });

    const getAnchorPosition = () => {
        if (!modalRef || !anchorRef()) return {};

        const modalRect = modalRef.getBoundingClientRect();
        const anchorRect = anchorRef().getBoundingClientRect();
        const offset = props.anchor.offset || 0;
        const anchorAlign = props.anchor?.align ?? 'bottom'
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let styles: JSX.CSSProperties = {};

        // Check if anchor is outside viewport
        if (anchorRect.left > windowWidth || anchorRect.right < 0 ||
            anchorRect.top > windowHeight || anchorRect.bottom < 0) {
            setIsVisible(false)
            return styles;
        }

        const margin = 0;

        switch (anchorAlign) {
            case 'top':
                if (anchorRect.left < windowWidth / 2) {
                    let left = anchorRect.left - (modalRect.width / 2) + (anchorRect.width / 2)
                    if (left < 0) left = margin
                    styles.left = `${left}px`;
                } else {
                    let right = windowWidth - (anchorRect.right + (modalRect.width / 2) - (anchorRect.width / 2))
                    if (right < 0) right = margin
                    styles.right = `${right}px`;
                }

                {
                    let top = anchorRect.top - modalRect.height - offset
                    if (top < 0) top = anchorRect.bottom
                    styles.top = `${top}px`;
                }
                break;

            case 'bottom':
                if (anchorRect.left < windowWidth / 2) {
                    let left = anchorRect.left - (modalRect.width / 2) + (anchorRect.width / 2)
                    if (left < 0) left = margin
                    styles.left = `${left}px`;
                } else {
                    let right = windowWidth - (anchorRect.right + (modalRect.width / 2) - (anchorRect.width / 2))
                    if (right < 0) right = margin
                    styles.right = `${right}px`;
                }

                {
                    let top = anchorRect.bottom + offset
                    if (top + modalRect.height > windowHeight) top = anchorRect.top - modalRect.height - offset
                    styles.top = `${top}px`;
                }
                break;

            case 'left':

                if (anchorRect.left - offset < windowWidth / 2) {
                    let left = anchorRect.left - modalRect.width - offset
                    if (left < 0) left = anchorRect.right + offset
                    styles.left = `${left}px`;
                } else {
                    let right = windowWidth - (anchorRect.right - anchorRect.width - offset)
                    styles.right = `${right}px`;
                }

                {
                    let top = anchorRect.top - (modalRect.height / 2) + (anchorRect.height / 2) - offset
                    if (top < 0) top = margin
                    if (top + modalRect.height > windowHeight) {
                        styles.bottom = `${margin}px`;
                    } else {
                        styles.top = `${top}px`;
                    }
                }

                break;

            case 'right':

                if (anchorRect.right + offset > windowWidth / 2) {
                    let right = windowWidth - anchorRect.left + offset;
                    if (right < 0) right = windowWidth - anchorRect.left - modalRect.width - offset;
                    styles.right = `${right}px`;
                } else {
                    let left = anchorRect.right + offset;
                    styles.left = `${left}px`;
                }

                {
                    let top = anchorRect.top - modalRect.height / 2 - offset + (anchorRect.height / 2)
                    if (top < 0) top = margin
                    if (top + modalRect.height > windowHeight) {
                        styles.bottom = `${margin}px`;
                    } else {
                        styles.top = `${top}px`;
                    }
                }

                break;
        }

        return styles;
    };

    // Check and adjust position to stay within bounds
    const adjustPosition = (styles: JSX.CSSProperties) => {
        if (!modalRef || !props) return styles;

        const modalRect = modalRef.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const margin = 10;

        let adjustedStyles: JSX.CSSProperties = { ...styles };

        // Handle horizontal positioning
        if (styles.left !== undefined) {
            let left = parseFloat(styles.left as string);
            if (left + modalRect.width > windowWidth) {
                left = windowWidth - modalRect.width - margin;
            }
            if (left < margin) left = margin;
            adjustedStyles.left = `${left}px`;
        } else if (styles.right !== undefined) {
            let right = parseFloat(styles.right as string);
            if (right + modalRect.width > windowWidth) {
                right = windowWidth - modalRect.width - margin;
            }
            if (right < margin) right = margin;
            adjustedStyles.right = `${right}px`;
        }

        // Handle vertical positioning
        if (styles.top !== undefined) {
            let top = parseFloat(styles.top as string);
            if (top + modalRect.height > windowHeight) {
                top = windowHeight - modalRect.height - margin;
            }
            if (top < margin) top = margin;
            adjustedStyles.top = `${top}px`;
        } else if (styles.bottom !== undefined) {
            let bottom = parseFloat(styles.bottom as string);
            if (bottom + modalRect.height > windowHeight) {
                bottom = windowHeight - modalRect.height - margin;
            }
            if (bottom < margin) bottom = margin;
            adjustedStyles.bottom = `${bottom}px`;
        }

        return adjustedStyles;
    };

    const getPosition = () => {

        if (!props) return {};
        if (props.anchor) return getAnchorPosition();
        if (!props.fixed) return {};

        const modalRect = modalRef.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let x = props.fixed.x;
        let y = props.fixed.y;
        const corner = props.fixed.corner || 'topleft';

        // Handle percentage values
        if (typeof x === 'string' && x.includes('%')) {
            x = (windowWidth * parseFloat(x)) / 100;
        }
        if (typeof y === 'string' && y.includes('%')) {
            y = (windowHeight * parseFloat(y)) / 100;
        }

        x = parseFloat(x.toString());
        y = parseFloat(y.toString());

        let styles: JSX.CSSProperties = {};

        switch (corner) {
            case 'topleft':
                styles = { left: `${x}px`, top: `${y}px` };
                break;
            case 'topright':
                styles = { right: `${x - modalRect.width}px`, top: `${y}px` };
                break;
            case 'bottomleft':
                styles = { left: `${x}px`, bottom: `${y - modalRect.height}px` };
                break;
            case 'bottomright':
                styles = { right: `${x}px`, bottom: `${y}px` };
                console.log(styles)
                break;
        }

        return styles;
    };

    return (
        <>
            {props?.anchor && props.anchor.element(anchorRef, setAnchorRef)}

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
                            ${props ? CssNAV.ModalPositioned : ''}
                            ${CssNAV[`Modal${animation.charAt(0).toUpperCase() + animation.slice(1)}`]}
                            `}
                            style={position()}
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
        </>
    );
}
