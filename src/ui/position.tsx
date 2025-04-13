import { createSignal, onMount, onCleanup, createEffect, Setter, Accessor } from "solid-js";

import { type JSX } from 'solid-js';
import { CssUI } from "./gen.ts";

export function PositionBox({ name, align, children, visible }: {
    name?: JSX.Element;
    align?: { x: number, y: number };
    children?: JSX.Element;
    visible?: boolean;
}) {
    const defaultAnchorPos = { l: 0, t: 0, r: 0, b: 0 };

    const [anchorPos, setAnchorPos] = createSignal(defaultAnchorPos);
    const [overlayPos, setOverlayPos] = createSignal(defaultAnchorPos);
    // const [dragging, setDragging] = createSignal(false);
    // const [startPos, setStartPos] = createSignal({ x: 0, y: 0 });
    const [show, setShow] = createSignal(visible ?? false);

    const alignment = align || { x: 0, y: 1 }
    // const alignment = { x: Math.random() * .8 - .4, y: Math.random() * .8 - .4 }

    let overlay: HTMLDivElement | undefined;
    let anchor: HTMLDivElement | undefined;

    const handleMouseEnter = (event: MouseEvent) => {
        const target = event.target as Node;
        let c = overlay!.contains(target) || anchor!.contains(target)
        setShow(c);
    };
    const handleMouseLeave = (event: MouseEvent) => {
        const target = event.target as Node;
        let c = overlay!.contains(target) || anchor!.contains(target)
        setShow(c);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if ((overlay && !overlay.contains(target)) &&
            (anchor && !anchor.contains(target))
        ) {
            setShow(false);
        }
    };

    createEffect(() => {
        if (show()) {
            document.addEventListener("mousedown", handleClickOutside);
        }
    });

    const updatePosition = () => {
        if (anchor) {
            const rect = anchor.getBoundingClientRect();
            setAnchorPos({
                l: rect.left,
                t: rect.top,
                r: rect.right,
                b: rect.bottom
            });
            updateOverlayPos();
        }
    };

    // const onMouseDown = (event: MouseEvent) => {
    //     setDragging(true);
    //     setStartPos({ x: event.clientX, y: event.clientY });
    //     event.preventDefault();
    // };

    // const onMouseMove = (event: MouseEvent) => {
    //     if (dragging()) {
    //         const deltaX = event.clientX - startPos().x;
    //         const deltaY = event.clientY - startPos().y;

    //         if (anchor) {
    //             setAnchorPos({
    //                 l: anchorPos().l + deltaX,
    //                 t: anchorPos().t + deltaY,
    //                 r: anchorPos().r + deltaX,
    //                 b: anchorPos().b + deltaY,
    //             });

    //             updateOverlayPos();

    //             setStartPos({ x: event.clientX, y: event.clientY });
    //         }
    //     }
    // };

    // const onMouseUp = () => {
    //     setDragging(false);
    // };

    onMount(() => {
        updatePosition();

        //---------
        // dragging
        //---------
        // document.addEventListener("mousemove", onMouseMove);
        // document.addEventListener("mouseup", onMouseUp);

        window.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);

        onCleanup(() => {
            //---------
            // dragging
            //---------
            // document.removeEventListener("mousemove", onMouseMove);
            // document.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
            // document.removeEventListener("mousedown", handleClickOutside);
        });
    });

    /*CSS:

    .PositionBox {
        display: inline-flex;

        // div {
        //     position: fixed;
        //     inset: 0px;
        //     z-index: 10;
        //     pointer-events: none;
        // }
        // div {
        //     inset: 0px;
        //     z-index: 10;
        //     pointer-events: none;
        // }
        > div {
            position: fixed;
            inset: 0px;
            z-index: 10;
            pointer-events: none;
        }
    }
    
    .PositionBox > button:hover {
        color: var : #90328b : #faa0f6;
        background-color: var : #efefef : #353535;
    }
    */

    return (
        <div class={CssUI.PositionBox}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span ref={anchor}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            // onMouseDown={onMouseDown}
            >
                {name}
            </span>

            <div>
                <div ref={overlay}
                    style={{
                        position: "absolute",
                        left: `${overlayPos().l}px`,
                        top: `${overlayPos().t}px`,
                        // opacity: show() ? 1 : 0,
                        visibility: show() ? "visible" : "hidden",
                        "transition-property": "opacity",
                        "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
                        "transition-duration": "300ms",
                        "pointer-events": "auto",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );

    function updateOverlayPos() {
        const boxrect = anchor!.getBoundingClientRect();
        let overlayRect = overlay!.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let ll = (overlayRect.width - boxrect.width) / 2;
        let tt = (overlayRect.height - boxrect.height) / 2;


        let rightC = alignment.x * (boxrect.width + ll)
        let topC = alignment.y * (boxrect.height + tt)

        let n = {
            l: anchorPos().l + rightC - ll,
            t: anchorPos().t + topC - tt,
            r: anchorPos().l + overlayRect.width + rightC - ll,
            b: anchorPos().t + overlayRect.height + topC - tt,
        };

        if (n.r > vw) {
            n.l = n.l - (n.r - vw);
            n.r = vw;
        }
        if (n.l < 0) {
            n.l = 0;
            n.r = overlayRect.width;
        }
        if (n.t < 0) {
            n.t = 0;
            n.b = overlayRect.height;
        }
        if (n.b > vh) {
            n.t = n.t - (n.b - vh);
            n.b = vh;
        }

        setOverlayPos(n);
    }
}

export function DragBox({ anchorRef, setAnchorRef }: {
    anchorRef: Accessor<HTMLButtonElement>
    setAnchorRef: Setter<HTMLButtonElement>,
}) {
    const [position, setPosition] = createSignal({ x: 0, y: 0 });
    const [dragging, setDragging] = createSignal(false);
    const [startPos, setStartPos] = createSignal({ x: 0, y: 0 });

    const updatePosition = () => {
        const box = anchorRef();
        if (box) {
            const rect = box.getBoundingClientRect();
            setPosition({
                x: rect.left,
                y: rect.top
            });
        }
    };

    const onMouseDown = (event: MouseEvent) => {
        setDragging(true);
        setStartPos({ x: event.clientX, y: event.clientY });
        event.preventDefault();
    };

    const onMouseMove = (event: MouseEvent) => {
        if (dragging()) {
            const deltaX = event.clientX - startPos().x;
            const deltaY = event.clientY - startPos().y;

            const box = anchorRef();
            if (box) {
                setPosition({
                    x: position().x + deltaX,
                    y: position().y + deltaY
                });
                setStartPos({ x: event.clientX, y: event.clientY });
            }
        }
    };

    const onMouseUp = () => {
        setDragging(false);
    };

    onMount(() => {
        updatePosition();
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        onCleanup(() => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        });
    });

    /*CSS:

    .SolDragBox {
        position: fixed; 
        inset: 0px;
        background-color: #ea83834e; 
        pointer-events: none; 
    }

    .SolDragBox > div {
        display: flex; 
        padding: 1rem; 
        justify-content: center; 
        align-items: center; 
        width: 10rem; 
        height: 10rem; 
        color: #ffffff; 
        background-color: #f3f63b33; 
        cursor: move; 
        pointer-events: auto; 
    }
    */

    return (
        <div class={CssUI.SolDragBox}>
            <div
                ref={setAnchorRef}
                style={{ position: "absolute", left: `${position().x}px`, top: `${position().y}px`, "z-index": 1000 }}
                onMouseDown={onMouseDown}
            >
                <div>
                    <div>X: {Math.round(position().x)}</div>
                    <div>Y: {Math.round(position().y)}</div>
                </div>
            </div>
        </div>
    );
}
