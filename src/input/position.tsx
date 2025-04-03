import { createSignal, onMount, onCleanup, createEffect } from "solid-js";

import { type JSX } from 'solid-js';

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
    let anchor: HTMLButtonElement | undefined;

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

    return (
        <div class="inline-flex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                ref={anchor}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                // onMouseDown={onMouseDown}
                class="AppPositionBoxButton"
            >
                {name}
            </button>

            <div class="fixed inset-0 pointer-events-none z-10">

                <div ref={overlay}
                    class={`${show() ? "opacity-100 visible" : "opacity-0 invisible"} transition-opacity duration-300 pointer-events-auto shadow-sm`}

                    style={{ position: "absolute", left: `${overlayPos().l}px`, top: `${overlayPos().t}px` }}
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

export function DragBox() {
    const [position, setPosition] = createSignal({ x: 0, y: 0 });
    const [dragging, setDragging] = createSignal(false);
    const [startPos, setStartPos] = createSignal({ x: 0, y: 0 });

    const updatePosition = () => {
        const box = document.getElementById("box");
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

            const box = document.getElementById("box");
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

    return (
        <div class="fixed inset-0 pointer-events-none bg-red-200">
            <div
                id="box"
                class="bg-blue-500 text-white p-4 w-40 h-40 flex items-center justify-center cursor-move pointer-events-auto"
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
