import { JSX } from "solid-js/jsx-runtime";
import { CssNAV } from "./gen";

/* CSS:
.HeaderNav {
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
        text-decoration: none;
    }
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
