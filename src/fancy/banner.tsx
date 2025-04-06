import { RocketIcon } from "../solgaleo.svg";
// import "../css/fancy.css"
import "./fancy.gen.css"

/* CSS:
.banner {
    padding: 1rem;
    background: var:#bd53ee:#40224e;
    --banner-border: var:#40224e:#bd53ee;
    border-inline-start: .25rem solid var(--banner-border);
    
    h5 {
        display: flex;
        gap: .5rem;
        align-items: center;
    }

    div {
        margin-top: .5rem;
    }
}
*/

export function Banner() {
    return <aside aria-label="Tip" class="banner">
        <h5 aria-hidden="true">
            <RocketIcon props={{ color: "white", size: 1, fontSize: 1.33 }} />
            Tip
        </h5>
        <div>
            <p>Although most developers will stick to just one UI framework, Astro supports multiple frameworks in the same project. This allows you to:</p>
            <ul>
                <li>Choose the framework that is best for each component.</li>
                <li>Learn a new framework without needing to start a new project.</li>
                <li>Collaborate with others even when working in different frameworks.</li>
                <li>Incrementally convert an existing site to another framework with no downtime.</li>
            </ul>
        </div>
    </aside>;
}
