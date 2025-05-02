import { JSX } from "solid-js";
import { IconRocket } from "../svg/svg";

/*CSS:
.banner {
    padding: 1rem;
    background: var(--surface);
    --banner-border: var(--primary);
    border-inline-start: .25rem solid var(--banner-border);
    
    h5 {
        display: flex;
        gap: .5rem;
        align-items: center;
    }

    div {
        margin-top: .5rem;
    }

    ol {
        list-style: none;
        counter-reset: cupcake;
        padding-left: 16px;
    }

    ol li {
        counter-increment: cupcake;
    }

    ol li:before {
        content: counters(cupcake, '.') ' ';
        color: var(--secondary);
        font-weight: bold;
        // font-family: cursive;
    }

    ol ol {
        padding-left: 20px;
    }
}
*/

export function Banner({ title, info, children }: { title: string, info?: string, children?: JSX.Element }) {
    return <aside aria-label="Tip" class="banner">
        <h5 aria-hidden="true">
            <IconRocket style={{ width: "2rem", height: "2rem", }} />
            {title}
        </h5>
        <div>
            <p>{info}</p>
            {children}
        </div>
    </aside>;
}
