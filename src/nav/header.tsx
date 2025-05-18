import { JSX } from "solid-js/jsx-runtime";
import { CssNAV, RouteChange } from "./gen";
import { useSolContext } from "../ui/provider";
import { IconCart, IconChevronLeft, IconHeart, IconLogout, IconSearch, IconSun, IconUser } from "../svg/svg";
import { CssUI } from "../ui/gen";

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


/*CSS:

.BottomBar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 64px;
    background-color: var(--color-white);
    border-top: 1px solid var(--color-border);
}

.BottomBarItem {
}

*/

export function BottomBar() {
    return <nav class={CssNAV.BottomBar}>
        <a href="#" class={CssNAV.BottomBarItem}>
            <IconSun />
        </a>
        <a href="#" class={CssNAV.BottomBarItem}>
            <IconSearch />
        </a>
        <a href="#" class={CssNAV.BottomBarItem}>
            <IconCart />
        </a>
        <a href="#" class={CssNAV.BottomBarItem}>
            <IconHeart />
        </a>
        <a href="#" class={CssNAV.BottomBarItem}>
            <IconUser />
        </a>
    </nav>;
}

/*CSS:

.MobileHeader {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

*/

export function MobileHeader() {
    return <header class={CssNAV.MobileHeader}>
        <button class={CssUI.IconButtonPlain}><IconChevronLeft /></button>
        <button class={CssUI.IconButton}><IconLogout /></button>
    </header>;
}
