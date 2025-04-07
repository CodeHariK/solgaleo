import { JSX } from "solid-js/jsx-runtime";
import { SolCSS } from "./ui.gen.css.ts";

export type ButtonProps = {
    type?: 'button' | 'submit' | 'reset';
    children?: JSX.Element;
    disabled?: boolean,
    onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined,
}

export function BaseButton(props: ButtonProps) {

    /*CSS:
    .SolButtonBase {
        padding-top: 0.625rem;
        padding-bottom: 0.625rem;
        padding-left: 1rem;
        padding-right: 1rem;
        gap: 0.5rem;
        align-items: center;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 600;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;
        user-select: none;
    }
    .SolButtonBase:hover {
        opacity: 0.75;
    }
    */

    return <button
        onClick={props.onClick}
        class={SolCSS.SolButtonBase}
        type={props.type}
        disabled={props.disabled}>
        {props.children}
    </button>;
}


export function IconButton(props: ButtonProps) {

    /*CSS:
    .SolIconButton {
        width: 1.75rem;
        height: 1.74rem;
    }
    */

    return <button
        onClick={props.onClick}
        class={`${SolCSS.SolButtonBase} ${SolCSS.SolIconButton}`}
        type={props.type}
        disabled={props.disabled}>
        {props.children}
    </button>;
}

export function MaterialButton(props: ButtonProps) {

    /*CSS:
    .SolMaterialButton {
        --mat-bg: var : #3b75c8 : #204477;
        --mat-color: var : #ffffff;
        --mat-border: var : 1px solid #cbd5e1;
        --mat-hover-bg: var : #4050c7 : #102747;
        --mat-hover-color: var : #ffffff;
        --mat-focus-bg: var : #f00;
        --mat-focus-color: var : #f00;
    
        justify-content: center;
        color: var(--mat-color);
        background: var(--mat-bg);
        border: var(--mat-border);
    }
    .SolMaterialButton:hover {
        color: var(--mat-hover-color);
        background: var(--mat-hover-bg);
    }
    .SolMaterialButton:focus {
        color: var(--mat-focus-color);
        background: var(--mat-focus-bg);
    }
    */

    return <button
        onClick={props.onClick}
        class={`${SolCSS.SolButtonBase} ${SolCSS.SolMaterialButton}`}
        type={props.type}
        disabled={props.disabled}>
        {props.children}
    </button>;
}

export function OutlinedButton(props: ButtonProps) {

    /*CSS:
    .SolOutlinedButton {
        --out-bg: var : transparent;
        --out-color: var : #475569 : #fff;
        --out-border: var : 1px solid #cbd5e1;
        --out-hover-bg: var : #c2c2c238 : #7d8dff4d;
        --out-hover-color: var : #6636e8 : #fff;
        --out-focus-bg: var : #f00 : green;
        --out-focus-color: var : yellow : #f00;
    
        justify-content: center;
        color: var(--out-color);
        background: var(--out-bg);
        border: var(--out-border);
    }
    .SolOutlinedButton:hover {
        color: var(--out-hover-color);
        background: var(--out-hover-bg);
    }
    .SolOutlinedButton:focus {
        color: var(--out-focus-color);
        background: var(--out-focus-bg);
    }
    */

    return <button
        onClick={props.onClick}
        class={`${SolCSS.SolButtonBase} ${SolCSS.SolOutlinedButton}`}
        type={props.type}
        disabled={props.disabled}>
        {props.children}
    </button>;
}
