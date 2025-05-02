import { JSX } from "solid-js/jsx-runtime";
import { CssNAV, RouteChange } from "./gen";
import { useSolContext } from "../ui/provider";

/*CSS:
.HeaderNav {
    margin: 0 auto;
    padding: .4rem 1rem;
    display: flex;
    align-items: center;
    max-height: 3rem; 
    justify-content: space-between;
}

// @media (min-width: 1536px) {
//     .HeaderNav {
//         padding: 0;
//     }
// }

.HeaderLeft {

    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    img {
        height: 2.4rem; 
    }

    p {
        font-size: 1.1rem;
    }
}
.HeaderLinks {
    display: flex;
    align-items: center;
    gap: 2rem;
}
.HeaderRight {
    display: flex;
    align-items: center;
}

@media (min-width: 1024px) {
    .HeaderRight {
        gap: 0.5rem;
    }
}
*/

export function IMG({ children, src, title, alt, style, className }: {
    children?: JSX.Element,
    src: string,
    title?: string,
    alt?: string,
    style?: JSX.CSSProperties,
    className?: string
}) {
    const { data } = useSolContext();

    return <img src={data.baseroute + src} alt={alt} title={title} style={style} class={className}>
        {children}
    </img>
}

export function AA({ children, href, title, style, className }: {
    children: JSX.Element,
    href: string,
    title?: string,
    style?: JSX.CSSProperties,
    className?: string
}) {
    const { data } = useSolContext();

    return (
        <a href={data.baseroute + href} onClick={RouteChange} title={title} style={style} class={className}>
            {children}
        </a>
    );
}

export function Header({ title, links, right: right }: {
    title?: JSX.Element | JSX.Element[],
    links?: JSX.Element | JSX.Element[],
    right?: JSX.Element | JSX.Element[]
}) {
    return <nav class={CssNAV.HeaderNav}>
        <div class={CssNAV.HeaderLeft}>
            {title}
        </div>
        <div class={CssNAV.HeaderLinks}>
            {links}
        </div>
        <div class={CssNAV.HeaderRight}>
            {right}
        </div>
    </nav>
}
