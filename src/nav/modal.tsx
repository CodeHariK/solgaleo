// import { createSignal, Setter } from "solid-js";
// import { IconCross } from "../svg/svg";

import { Signal, createEffect, createSignal, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import { CssNAV } from "./gen";


import { type JSX } from 'solid-js';
import { CssUI } from "../gen";

/*CSS:
.ModalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    z-index: 50;
    pointer-events: none;
}

.ModalContent {
    background: var(--modal-bg);
    color: var(--modal-col);
    // padding: 1rem;
    border-radius: 0.5rem;
    // box-shadow: 0 4px 6px -1px var(--surface);
    overflow-y: auto;
    pointer-events: none;
    
    position: fixed;
    inset: var(--ModalFullScreen);
    max-width: 100%;
    max-height: 100%;

    transform-origin: center;

    transform: translateY(10px);
    opacity: 0;
}
.ModalContentShow {
    pointer-events: auto;
    
    transform: translateY(0px);
    opacity: 1;
    transition: all 0.4s ease-in-out;
}

*/

type AnchorAlign = 'top' | 'bottom' | 'left' | 'right';

type CornerPosition = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

type ModalProps = {
    visibilitySignal?: Signal<boolean>;
    child: (anchorRef: HTMLButtonElement | null, visible: Signal<boolean>) => JSX.Element;
    title?: string;
    parentScrollContainerQuery?: string,
    overlayMargin?: number;
    fullScreen?: boolean;

    fixed?: {
        x: number | string;
        y: number | string;
        corner?: CornerPosition;
    },
    anchor?: {
        element: (anchorRef: Signal<HTMLButtonElement>, visibilitySignal: Signal<boolean>) => JSX.Element,
        align?: AnchorAlign;
        offset?: number;
    };
};

export function Modal(props: ModalProps) {
    const [isVisible, setIsVisible] = props.visibilitySignal ?? createSignal(false);

    let modalRef!: HTMLDivElement;

    const [anchorRef, setAnchorRef] = createSignal<HTMLButtonElement>();

    const [position, setPosition] = createSignal<JSX.CSSProperties>({});

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsVisible(false);
    };

    const handleViewportChange = () => {
        setPosition(adjustPosition(getPosition()));
    };

    createEffect(() => {

        const gridMiddleElements = document.querySelectorAll(
            `.${CssUI.GridLeft}, 
            .${CssUI.GridRight}, 
            .${CssUI.GridMiddle}, 
            .${CssUI.GridScrollContainer} 
            ${props.parentScrollContainerQuery != null ? `, .${props.parentScrollContainerQuery}` : ""}`);

        if (gridMiddleElements.length > 0) {
            for (let i = 0; i < gridMiddleElements.length; i++) {
                gridMiddleElements[i].addEventListener("scroll", handleViewportChange);
            }
        }

        if (isVisible()) {
            handleViewportChange()
            document.addEventListener("keydown", handleEscape);
            window.addEventListener("resize", handleViewportChange);
            document.addEventListener("click", windowClickCloser);
            // Delay to trigger animation
            setTimeout(() => setIsVisible(true), 100);
        } else {
            setIsVisible(false);
            document.removeEventListener("keydown", handleEscape);
            window.removeEventListener("resize", handleViewportChange);
            document.removeEventListener("click", windowClickCloser);
            if (gridMiddleElements.length > 0) {
                for (let i = 0; i < gridMiddleElements.length; i++) {
                    gridMiddleElements[i].removeEventListener("scroll", handleViewportChange);
                }
            }
        }

        const anchor = anchorRef();
        if (!anchor || !isVisible()) return;

        // Watch for position/attribute changes
        const mutationObserver = new MutationObserver((mutations) => {
            const hasPositionChange = mutations.some(mutation =>
                mutation.type === 'attributes' &&
                (mutation.attributeName === 'style' ||
                    mutation.attributeName === 'class')
            );
            if (hasPositionChange) {
                handleViewportChange();
            }
        });

        // Start observing
        mutationObserver.observe(anchor, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        // Cleanup
        onCleanup(() => {
            mutationObserver.disconnect();
        });
    });

    function windowClickCloser(e) {
        if (isVisible() && !(anchorRef()?.contains(e.target) || modalRef.contains(e.target))) {
            setIsVisible(false)
        }
    }

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

        switch (anchorAlign) {
            case 'top':
                {
                    let left = anchorRect.left + anchorRect.width / 2 - modalRect.width / 2
                    if (left < 0) left = anchorRect.left
                    styles.left = `${left}px`

                    let top = anchorRect.top - modalRect.height - offset
                    if (top < 0) top = anchorRect.bottom + offset
                    styles.top = `${top}px`;
                }
                break;

            case 'bottom':

                {
                    let left = anchorRect.left + anchorRect.width / 2 - modalRect.width / 2
                    if (left < 0) left = anchorRect.left
                    styles.left = `${left}px`

                    let top = anchorRect.bottom + offset
                    if (top + modalRect.height > windowHeight) top = anchorRect.top - modalRect.height - offset
                    styles.top = `${top}px`;
                }
                break;

            case 'left':

                {
                    let left = anchorRect.left - modalRect.width - offset
                    if (left < 0) left = anchorRect.right + offset
                    styles.left = `${left}px`

                    let top = anchorRect.top - (modalRect.height / 2) + (anchorRect.height / 2)
                    if (top < 0) top = 0
                    styles.top = `${top}px`;
                }

                break;

            case 'right':

                {
                    let left = anchorRect.right + offset
                    if (left + modalRect.width > windowWidth) left = anchorRect.left - offset - modalRect.width
                    styles.left = `${left}px`

                    let top = anchorRect.top - (modalRect.height / 2) + (anchorRect.height / 2)
                    if (top < 0) top = 0
                    styles.top = `${top}px`;
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
        const margin = props.overlayMargin ?? 0;

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
                break;
        }

        return styles;
    };

    return (
        <>
            {props?.anchor && props.anchor.element([anchorRef, setAnchorRef], [isVisible, setIsVisible])}

            <Portal>
                <div class={`${CssNAV.ModalOverlay}`}>
                    <div ref={modalRef}
                        class={`${CssNAV.ModalContent} ${isVisible() ? CssNAV.ModalContentShow : ''}`}
                        style={{
                            ...position(),
                            "--ModalFullScreen": props.fullScreen ? "0px" : ""
                        }}
                    >
                        {props.child(anchorRef(), [isVisible, setIsVisible])}
                    </div>
                </div>
            </Portal>
        </>
    );
}
