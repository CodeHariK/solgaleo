import { Component } from "solid-js";

/*CSS:
--blog-bg: var : #ffffff : #282a36;
--blog-border: var : 0px solid #ddd;
--blog-hover-bg: var : #fef8ff : #3c263d;

--blog-title-color: var : #333 : #ff79c6;
--blog-underline-color: var : #9573d9;
--blog-description-color: var : #444 : #ccc;

--tag-bg: var : #636db333;
--tag-color: var : #060505 : #bd93f9;
--tag-hover-bg: var : #9573d9 : #ffffff42;
--tag-hover-color: var : #eef788;

.blog-list {
    display: flex;
    flex-direction: column;
    font-family: sans-serif;
    align-items: center;
    width: 70%;
    flex-grow: 1;
}

.blog-item {
    padding: 1rem;
    border: var(--blog-border);
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
    background: var(--blog-bg);
    margin-bottom: 1rem;
    width: 80%;
}

.blog-item:hover {
    background: var(--blog-hover-bg);
}

@keyframes fadeSlideIn {
    0% {
        opacity: 0;
        transform: translateX(50px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.blog-item.animate-in {
    animation: fadeSlideIn 1s ease forwards;
}

.blog-title {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: var(--blog-title-color);
    display: inline-block;
    position: relative;
    margin-bottom: .7rem;
}

.blog-item:hover .blog-title {
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-underline-offset: .4rem;
    text-decoration-color: var(--blog-underline-color);
}

.blog-meta {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: .4em;
    margin: 4px 0;
}

.tags {
    background: var(--tag-bg);
    color: var(--tag-color);
    padding: .25rem .5rem;
    border-radius: 0px;
}

.tags:hover {
    background: var(--tag-hover-bg);
    color: var(--tag-hover-color);
}

.blog-list .description {
    font-size: 14px;
    color: var(--blog-description-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    margin-top: .4rem;
}

.blog-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
}

.blog-sidebar {
    width: 30%;
    max-width: 300px;
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--sidebar-bg, #f4f4f4);
    padding: 10px;
    overflow-y: auto;
    max-height: 80vh;
}

.blog-link {
    display: block;
    padding: 8px;
    text-decoration: none;
    color: var(--blog-title-color, #333);
    transition: color 0.3s ease, transform 0.3s ease;
}

.blog-link.active {
    font-weight: bold;
    color: var(--blog-underline-color, #9573d9);
    transition: color 0.3s ease, transform 0.3s ease;
    transform: scale(1.05);
}
*/

function getRandomColor() {
    const colors = ["#9573d9", "#ff5733", "#33ff57", "#5733ff", "#ff33a1"];
    return colors[Math.floor(Math.random() * colors.length)];
}

type BlogItem = {
    title: string;
    tags: string[];
    description: string;
    link: string;
};

import { createSignal, createEffect, onCleanup } from "solid-js";

export const BlogList: Component<{ blogs: BlogItem[] }> = (props) => {
    const [activeBlog, setActiveBlog] = createSignal(""); // Track the currently visible blog

    createEffect(() => {
        const observer = new IntersectionObserver(
            (entries, _observer) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveBlog(entry.target.id); // Update active blog ID
                        entry.target.classList.add("animate-in");
                        break;
                    } else {
                        entry.target.classList.remove("animate-in");
                    }
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: [0.5, 0.75, 1.0]
            }
        );

        const blogElements = document.querySelectorAll(".blog-item");
        blogElements.forEach((el) => observer.observe(el));

        onCleanup(() => {
            observer.disconnect(); // Cleanup observer when component unmounts
        });
    });

    return (
        <div class="blog-container">
            <div class="blog-list">
                {props.blogs.map((blog) => (
                    <div id={blog.title.replace(" ", "_")} class="blog-item">
                        <h2 class="blog-title" style={{
                            "--blog-underline-color": getRandomColor()
                        }}>{blog.title}</h2>
                        <div class="blog-meta">
                            {blog.tags.map((tag) => (
                                <h6 class="tags">{tag}</h6>
                            ))}
                        </div>
                        <p class="description">{blog.description}</p>
                    </div>
                ))}
            </div>

            <div class="blog-sidebar">
                {props.blogs.map((blog) => (
                    <a
                        href={`#${blog.title.replace(" ", "_")}`}
                        class={`blog-link ${activeBlog() === blog.title.replace(" ", "_") ? "active" : ""}`}
                    >
                        {blog.title}
                    </a>
                ))}
            </div>
        </div>
    );
};

