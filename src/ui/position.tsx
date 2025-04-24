import { createSignal, onMount, onCleanup, Setter, Accessor } from "solid-js";

import { CssUI } from "./gen.ts";

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

    /*CSS:*

    .DragBox {
        position: fixed; 
        inset: 0px;
        background-color: #e7e7e727; 
        pointer-events: none; 
    }

    .DragBox > div {
        display: flex; 
        padding: 1rem; 
        justify-content: center; 
        align-items: center; 
        width: 10rem; 
        height: 10rem; 
        color: #ffffff; 
        background-color: #ff3fc2d6; 
        cursor: move; 
        pointer-events: auto; 
    }
    */

    return (
        <div class={CssUI.DragBox}>
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
