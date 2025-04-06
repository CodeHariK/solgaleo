import { type JSX } from 'solid-js';

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

@media (min-width: 768px) {
}

@media (min-width: 1024px) {}
*/

export function Mark(props: HeadingProps) {
    return <mark class={`px-2 text-white bg-blue-600 rounded night:bg-blue-500 ${props.class}`}>{props.children}</mark>;
}

export function GradientText(props: HeadingProps) {
    return <span class={`text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ${props.class}`}>{props.children}</span>;
}

export function UnderlineText(props: HeadingProps) {
    return <span class={`underline underline-offset-3 decoration-8 decoration-blue-400 night:decoration-blue-600 ${props.class}`}>{props.children}</span>;
}

export function BadgeText(props: HeadingProps) {
    return <span class={`bg-blue-100 ${props.class} text-blue-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded night:bg-blue-200 night:text-blue-800`}>
        {props.children}
    </span>;
}

export function SmallBadgeText(props: HeadingProps) {
    return <span class={`bg-blue-100 ${props.class} text-blue-800 text-sm font-medium me-2 px-2.5 py-1 rounded night:bg-blue-200 night:text-blue-800`}>
        {props.children}
    </span>;
}

export type AvatarProps = {
    src: string;
    alt?: string;
}

export function Avatar(props: AvatarProps) {
    return <img src={props.src}
        alt={props.alt}
        class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />;
}

export type ListTileProps = {
    start?: JSX.Element;
    title: string;
    subtitle?: string;
    end?: JSX.Element;
}

export function ListTile(props: ListTileProps) {
    return <div class="flex justify-between items-center gap-3">
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
    return <div class="flex flex-col">
        <h6 class="font-semibold">
            {props.title}
        </h6>
        <p>
            {props.subtitle}
        </p>
    </div>;
}
