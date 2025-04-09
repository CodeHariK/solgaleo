import { createSignal, Setter } from "solid-js";
import { IconCross } from "../svg/svg";

import { type JSX } from 'solid-js';

export type ModalProps = {
    show?: boolean;
    child: JSX.Element;
    align?: { x: number, y: number };
    size?: { x: number };
    modal: (setShow: Setter<boolean>) => JSX.Element;
}

export function Modal(props: ModalProps) {

    let align = props.align ?? { x: 50, y: 50 }
    let size = props.size ?? { x: 28 }

    const [show, setShow] = createSignal(props.show || false);

    return (
        <>
            <button onClick={() => { setShow(true) }}>
                {props.child}
            </button>
            {
                !show()
                    ?
                    <></>
                    :
                    <div id="Modal" onClick={() => { setShow(false) }} class="fixed z-50 w-full items-center justify-center overflow-y-auto overflow-x-hidden inset-0">
                        <div onClick={(event) => { event.stopPropagation() }} style={{ left: `${align?.x + "%"}`, top: `${align?.y + "%"}`, "max-width": `${size?.x + "%"}` }}
                            class={`${show() ? "opacity-100 visible" : "opacity-0 invisible"} pointer-events-auto bg-gray-50 night:bg-gray-800 rounded-lg transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 relative w-full h-auto shadow-2xl`}>

                            <button onclick={() => { if (setShow) setShow(false); }} type="button" class="absolute z-50 right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 night:hover:bg-gray-600 night:hover:text-white" data-modal-toggle="deleteOrderModal">
                                <IconCross />
                            </button>

                            <div class="rounded-lg p-4 pt-10 text-center">
                                {props.modal(setShow)}
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}
