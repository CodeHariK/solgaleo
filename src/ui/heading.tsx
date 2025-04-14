import { type JSX } from 'solid-js';
import { CssUI } from './gen.ts';

export type HeadingProps = {
    class?: string;
    children: JSX.Element;
}

/*CSS:
h1 {
    font-size: 1.9rem;
    line-height: 2rem;
    font-weight: 600;
    letter-spacing: -0.025em;
}

h2 {
    font-size: 1.7rem;
    line-height: 1.8rem;
    font-weight: 600;
    letter-spacing: -0.025em;
}

h3 {
    font-size: 1.5rem;
    line-height: 1.8rem;
    font-weight: 500;
    letter-spacing: -0.025em;
}

h4 {
    font-size: 1.3rem;
    line-height: 1.7rem;
    font-weight: 500;
    letter-spacing: -0.025em;
}

h5 {
    font-size: 1.1rem;
    line-height: 1.6rem;
    font-weight: 500;
    letter-spacing: -0.025em;

}

h6 {
    font-size: 1rem;
    line-height: 1.4rem;
    font-weight: 400;
}

p,
li {
    font-size: 0.85rem;
    line-height: 1.25rem;
}

a {
    color: var : #ffe4c4 : #ffe4c4;

    :hover {
        --a-hover-col: var : #ffac90 : #ffac90;
        color: var(--a-hover-col);
    }
    :active, .active {
        --a-active-col: var : #cf90ff : #cf90ff; 
        color: var(--a-active-col);
    }
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {}
*/

export type AvatarProps = {
    src: string;
    alt?: string;
}

export function Avatar(props: AvatarProps) {

    /*CSS:
    .avatar {
        display: inline-block;
        object-fit: cover;
        object-position: center;
        position: relative;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 9999px;
    }
    */

    return <img src={props.src} alt={props.alt} class={CssUI.Avatar} />;
}

export type ListTileProps = {
    start?: JSX.Element;
    title: string;
    subtitle?: string;
    end?: JSX.Element;
}

export function ListTile(props: ListTileProps) {
    return <div style={{
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        gap: "0.75rem"
    }}>
        <div class='flex gap-4'>
            {props.start}
            <TitleSubtitle title={props.title} subtitle={props.subtitle}></TitleSubtitle>
        </div>
        {props.end}
    </div>;
}

export type TitleSubtitleProps = {
    title: string;
    subtitle?: string;
}

export function TitleSubtitle(props: TitleSubtitleProps) {
    return <div style={{ "display": "flex", "flex-direction": "column" }}>
        <h6>
            {props.title}
        </h6>
        <p>
            {props.subtitle}
        </p>
    </div>;
}
