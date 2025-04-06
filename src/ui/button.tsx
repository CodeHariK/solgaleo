import { JSX } from "solid-js/jsx-runtime";

/*CSS:
.AppButtonBase {
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
.AppButtonBase:hover {
    opacity: 0.75;
}

.AppIcon {

    --icon-width: var : 1.2rem;
    --icon-height: var : 1.2rem;
    --icon-bg: var : transparent;
    --icon-color: var : #475569;
    --icon-border: var : 0px solid #cbd5e1;

    display: inline-block;
    flex-shrink: 0;
    font-size: 0.75rem;
    line-height: 1rem;
    width: var(--icon-width);
    height: var(--icon-height);
    color: var(--icon-color);
    background: var(--icon-bg);
    border: var(--icon-border);
}
.AppIconButton {
    width: 1.75rem;
    height: 1.74rem;
}

.AppMaterialButton {

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
.AppMaterialButton:hover {
    color: var(--mat-hover-color);
    background: var(--mat-hover-bg);
}
.AppMaterialButton:focus {
    color: var(--mat-focus-color);
    background: var(--mat-focus-bg);
}

.AppOutlinedButton {

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
.AppOutlinedButton:hover {
    color: var(--out-hover-color);
    background: var(--out-hover-bg);
}
.AppOutlinedButton:focus {
    color: var(--out-focus-color);
    background: var(--out-focus-bg);
}

*/

export type ButtonProps = {
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    children?: JSX.Element;
    disabled?: boolean,
    onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined,
}

export function IconButton(props: ButtonProps) {
    return <button onClick={props.onClick} class={`AppButtonBase AppIconButton ${props.class ?? ""}`} type={props.type} disabled={props.disabled}>
        {props.children}
    </button>;
}

export function BaseButton(props: ButtonProps) {
    return <button onClick={props.onClick} class={`AppButtonBase ${props.class ?? ""}`} type={props.type} disabled={props.disabled}>
        {props.children}
    </button>;
}

export function MaterialButton(props: ButtonProps) {
    return <button onClick={props.onClick} class={`AppButtonBase AppMaterialButton ${props.class ?? ""}`} type={props.type} disabled={props.disabled}>
        {props.children}
    </button>;
}

export function OutlinedButton(props: ButtonProps) {
    return <button onClick={props.onClick} class={`AppButtonBase AppOutlinedButton ${props.class ?? ""}`} type={props.type} disabled={props.disabled}>
        {props.children}
    </button>;
}
