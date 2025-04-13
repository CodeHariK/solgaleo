import { JSX } from "solid-js/jsx-runtime";
import { CssNAV } from "./gen";
import { A } from "@solidjs/router";

/* CSS:
.HeaderLink {
    display: block;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    text-decoration: none;
    transition: color 0.2s;
    color: var : #374151 : #ffffff ;
}

.HeaderLink:hover {
    color: var : red : green ;
}

.HeaderLink:active {
    color: var : yellow : pink;
}
*/

export function HeaderLink({ href, title, fn }: { href: string, title: string, fn?: (href: string) => void }) {
    const handleLinkClick = (event: MouseEvent) => {
        if (fn) {
            event.preventDefault();
            fn(href)
        };
    };

    return <A
        onClick={handleLinkClick}
        href={href}
        title={title}
        class={CssNAV.HeaderLink}
    >
        {title}
    </A>
}

/* CSS:
.HeaderNav {
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

// @media (min-width: 1536px) {
//     .HeaderNav {
//         padding: 0;
//     }
// }

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
}

@media (min-width: 800px) {
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
    return <nav class={CssNAV.HeaderNav}>
        <div class={CssNAV.HeaderLeft}>
            <A href="/" class={CssNAV.HeaderLogo}>
                <div class={CssNAV.HeaderLogoContent}>
                    {iconSrc && (
                        <div class={CssNAV.HeaderIcon}>
                            <img src={iconSrc} />
                        </div>
                    )}
                    {title}
                </div>
            </A>

            <ul class={CssNAV.HeaderLinks}>
                {links}
            </ul>
        </div>

        <div class={CssNAV.HeaderRight}>
            {rightChildren}
        </div>
    </nav>
}
