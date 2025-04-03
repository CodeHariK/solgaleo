import { JSX } from "solid-js/jsx-runtime";

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
