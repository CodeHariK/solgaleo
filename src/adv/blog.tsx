import "./blog.css"

import { Component } from "solid-js";

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

