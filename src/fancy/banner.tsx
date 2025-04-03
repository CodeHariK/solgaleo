import { RocketIcon } from "../solgaleo.svg";
import "../css/fancy.css"

export function Banner() {
    return <aside aria-label="Tip"
        style={{ padding: "1rem", "background": "var(--banner-bg)", "border-inline-start": ".25rem solid var(--banner-border)" }}>
        <h5 style={{ display: "flex", "gap": ".5rem", "align-items": "center" }} aria-hidden="true">
            <RocketIcon props={{ color: "white", size: 1, fontSize: 1.33 }} />
            Tip
        </h5>
        <div style={{ "margin-top": ".5rem" }}>
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
