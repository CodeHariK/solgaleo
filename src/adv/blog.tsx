import "./blog.css"

import { Component } from "solid-js";

type BlogItem = {
    title: string;
    tags: string[];
    description: string;
    link: string;
};

export const BlogList: Component<{ blogs: BlogItem[] }> = (props) => {
    return (
        <div class="blog-list">
            {props.blogs.map((blog) => (
                <div class="blog-item" onclick={() => (window.location.href = blog.link)}>
                    <h2 class="blog-title">{blog.title}</h2>
                    <div class="blog-meta">
                        {blog.tags.map((tag) => <span class="tags">{tag}</span>)}
                    </div>
                    <p class="description">{blog.description}</p>
                </div>
            ))}
        </div>
    );
};
