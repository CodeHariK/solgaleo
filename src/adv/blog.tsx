import { For, JSX } from "solid-js";

/*CSS:

.BlogContainer {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
}

.BlogSection {
    display: flex;
    flex-direction: column;
    width: 80%;
}

.BlogAside {
    max-width: 300px;
    max-height: 300px;

    position: sticky;
    top: 25%;
    // transform: translateY(-50%);

    display: flex;
    flex-direction: column;

    align-items: center;
    background: var(--surface-bg);
    padding: 20px;
    border-radius: 10px;
    overflow-x: clip;
    overflow-y: auto;
}

.BlogItem {
    padding: 1rem;
}

.BlogItemAnimate {
    animation: fadeSlideIn 1s ease forwards;
}

.BlogLinkActive {
    font-weight: bold;
    color: var(--secondary);
    transition: color 0.5s ease, transform 0.3s ease;
    transform: scale(1.05);
}

*/

import { createSignal, createEffect, onCleanup } from "solid-js";
import { CssADV } from "./gen";

export function BlogList({ id, blogs }: { id: string, blogs: { element: JSX.Element, title: string }[] }) {
    const [activeBlog, setActiveBlog] = createSignal("");
    let sidebarRef: HTMLDivElement | undefined;

    createEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const targetId = entry.target.id;

                    if (entry.isIntersecting) {
                        if (!entry.target.classList.contains(CssADV.BlogItemAnimate)) {
                            setActiveBlog(targetId); // Update active blog ID
                            entry.target.classList.add(CssADV.BlogItemAnimate);

                            const activeLink = document.querySelector(`a[href="#${activeBlog()}"]`);
                            if (activeLink && sidebarRef) {
                                const sidebarRect = sidebarRef.getBoundingClientRect();
                                const linkRect = activeLink.getBoundingClientRect();

                                // Calculate the offset to center the active link in the sidebar
                                const offset = linkRect.top - sidebarRect.top - (sidebarRect.height / 2) + (linkRect.height / 2);

                                // Scroll the sidebar to center the active link
                                sidebarRef.scrollTo({
                                    top: sidebarRef.scrollTop + offset,
                                    behavior: 'smooth' // Optional: smooth scrolling
                                });
                            }
                        }
                    } else {
                        if (entry.target.classList.contains(CssADV.BlogItemAnimate)) {
                            entry.target.classList.remove(CssADV.BlogItemAnimate);
                        }
                    }
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: [0.5, 0.75, 1.0]
            }
        );

        const blogElements = document.querySelectorAll(`#${id} .${CssADV.BlogItem}`);
        blogElements.forEach((el) => observer.observe(el));

        onCleanup(() => {
            observer.disconnect(); // Cleanup observer when component unmounts
        });
    });

    return (
        <article id={id} class={CssADV.BlogContainer}>
            <section class={CssADV.BlogSection}>
                <For each={blogs}>
                    {(blog) => {
                        return <div id={blog.title} class={CssADV.BlogItem}>
                            {blog.element}
                        </div>
                    }}
                </For>
            </section>

            <aside ref={sidebarRef} class={CssADV.BlogAside}>
                <For each={blogs}>
                    {(blog) => {
                        return <a
                            href={`#${blog.title}`}
                            classList={{ [CssADV.BlogLinkActive]: activeBlog() === blog.title }}
                            aria-label={`Read more about ${blog.title}`}
                        >
                            {blog.title}
                        </a>
                    }}
                </For>
            </aside>
        </article>
    );
};
