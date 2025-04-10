import { JSX } from "solid-js/jsx-runtime";
import { CssNAV } from "./gen";

/* CSS:
// ...existing code...

.HeaderLink {
    display: block;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: var(--text-color, #374151);
    text-decoration: none;
    transition: color 0.2s;
}

.HeaderLink:hover {
    color: var(--link-hover-color, #4f46e5);
}

.HeaderLink:active {
    color: var(--link-active-color, #4338ca);
}
*/

export function HeaderLinks({ href, title, fn }: { href: string, title: string, fn?: (href: string) => void }) {
    const handleLinkClick = (event: MouseEvent) => {
        event.preventDefault();
        if (fn) fn(href);
    };

    return <li>
        <a
            onClick={handleLinkClick}
            href={href}
            title={title}
            class={CssNAV.HeaderLink}
        >
            {title}
        </a>
    </li>;
}

/* CSS:
.HeaderNav {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-smooth: antialiased;
}

@media (min-width: 1536px) {
    .HeaderNav {
        padding: 0;
    }
}

.HeaderLeft {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.HeaderLogo {
    text-decoration: none;
}

.HeaderLogoContent {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.HeaderIcon {
    min-width: 4rem;
}

.HeaderIcon img {
    display: block;
    width: auto;
    height: 3rem;
}

.HeaderLinks {
    display: none;
    list-style-type: none;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0.75rem 0;
}

@media (min-width: 1024px) {
    .HeaderLinks {
        display: flex;
    }
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

export function Header({ iconSrc, title, links, rightChildren }: {
    iconSrc?: string,
    title?: JSX.Element | JSX.Element[],
    links?: JSX.Element | JSX.Element[],
    rightChildren?: JSX.Element | JSX.Element[]
}) {
    return <header>
        <nav class={CssNAV.HeaderNav}>
            <div class={CssNAV.HeaderLeft}>
                <a href="/" class={CssNAV.HeaderLogo}>
                    <div class={CssNAV.HeaderLogoContent}>
                        {iconSrc && (
                            <div class={CssNAV.HeaderIcon}>
                                <img src={iconSrc} />
                            </div>
                        )}
                        {title}
                    </div>
                </a>

                <ul class={CssNAV.HeaderLinks}>
                    {links}
                </ul>
            </div>

            <div class={CssNAV.HeaderRight}>
                {rightChildren}
            </div>
        </nav>
    </header>
}

/* CSS:

.TransitionContainer {
    position: relative;
}

.TransitionItem {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.Show {
    opacity: 1;
    position: relative;
    pointer-events: auto;
}

.Hide {
    opacity: 0;
    position: absolute;
    pointer-events: none;
}
*/

export function TransitionWidget(props: { showFirstWidget: boolean, one: JSX.Element, two: JSX.Element }) {
    return (
        <div class={CssNAV.TransitionContainer}>
            <div class={`${CssNAV.TransitionItem} ${props.showFirstWidget ? CssNAV.Show : CssNAV.Hide}`}>
                {props.one}
            </div>
            <div class={`${CssNAV.TransitionItem} ${!props.showFirstWidget ? CssNAV.Show : CssNAV.Hide}`}>
                {props.two}
            </div>
        </div>
    );
};
