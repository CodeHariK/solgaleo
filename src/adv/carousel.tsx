/*CSS:*

.carousel {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;

    @media (prefers-reduced-motion: no-preference) {
        scroll-behavior: smooth;
    }

    & li {
        scroll-snap-align: center;
    }
}

.carousel {
    &::scroll-button(*) {
        inline-size: 48px;
        aspect-ratio: 1;
        border-radius: 1e3px;
        border: 2px solid #999;

        margin: 5px;
    }

    &::scroll-button(*):focus-visible {
        outline-offset: 5px;
    }

    &::scroll-button(*):not(:disabled):is(:hover, :active) {
        background-color: Canvas;
    }

    &::scroll-button(*):not(:disabled):active {
        scale: 90%;
    }

    &::scroll-button(left) {
        content: "⬅" / "Scroll Left";
        grid-area: left; 
    }

    &::scroll-button(right) {
        content: "⮕" / "Scroll Right";
        grid-area: right;
    }
}

.carousel {
    scroll-marker-group: after;

    &::scroll-marker-group {
        grid-area: markers; 

        display: grid;
        place-content: safe center;
        grid: 30px / auto-flow 30px;
        gap: 15px;
        padding: 15px;
        scroll-padding: 15px;

        overflow: auto;
        overscroll-behavior-x: contain;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;

        @media (prefers-reduced-motion: no-preference) {
            scroll-behavior: smooth;
        }
    }

    & > .content > li {
        &::scroll-marker {
            content: " "; 

            border: 1px solid #bbb;
            border-radius: 50%;
            outline-offset: 4px;
            -webkit-tap-highlight-color: transparent;

            scroll-snap-align: center;
        }

        &::scroll-marker:is(:hover, :focus-visible) {
            border-color: LinkText;
        }

        &::scroll-marker:target-current {
            background: LinkText;
            border-color: LinkText;
        }
    }
}


@layer support.demo {
    html, body {
        block-size: 100%;
    }

    body {
        display: grid;
        place-content: start center;
        margin: 0;
        padding: 10vmin;
    }

    .scroll-layout {
        display: grid;

        grid-template-areas: 
        "left scroll right"
        ". markers .";

        grid-template-areas: 
        "scroll scroll scroll"
        "left markers right";

        grid-template-columns: auto 1fr auto;

        .carousel {
            grid-area: scroll;
        }
    }

    .carousel {
        max-inline-size: 80cqi;
        overscroll-behavior-x: contain;
        scroll-behavior: smooth;
    }

    .content {
        display: grid;
        grid: 50vmin / auto-flow 50vmin;
        gap: 15px;
        padding: 0;
        margin: 0;

        > li {
            list-style-type: none;
            border: 3px solid #888;
        }

        > li.active {
            background-color: #f0f0f0;
            border-color: #007bff;
        }
    }
}
*/


import { createSignal, onCleanup, onMount } from 'solid-js';

export function Carousel() {
    const [activeIndex, setActiveIndex] = createSignal(null);
    const itemsRef = [];

    const updateActiveIndex = () => {
        const carousel = document.querySelector('.carousel');
        const carouselRect = carousel.getBoundingClientRect();
        let closestIndex = null;
        let closestDistance = Infinity;

        itemsRef.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const carouselCenter = carouselRect.left + carouselRect.width / 2;
            const distance = Math.abs(itemCenter - carouselCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveIndex(closestIndex);
    };

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateActiveIndex();
                }
            });
        }, {
            threshold: 0.5 // Adjust this value to determine how much of the item needs to be visible
        });

        itemsRef.forEach(item => {
            if (item) {
                observer.observe(item);
            }
        });

        // Add a scroll event listener to update the active index
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('scroll', updateActiveIndex);

        onCleanup(() => {
            itemsRef.forEach(item => {
                if (item) {
                    observer.unobserve(item);
                }
            });
            carousel.removeEventListener('scroll', updateActiveIndex);
        });
    });

    return (
        <div class="scroll-layout">
            <div class="carousel">
                <ul class="content">
                    {Array.from({ length: 10 }, (_, index) => (
                        <li
                            ref={el => itemsRef[index] = el}
                            class={activeIndex() === index ? 'active' : ''}
                        >
                            Item {index + 1}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/*CSS:*

.carousel2 {

    --size-2: .5rem;
    --size-3: 1rem;
    --size-5: 1.5rem;
    --size-9: 4rem;
    --size-content-2: 45ch;
    --ease-3: cubic-bezier(.25, 0, .3, 1);

    display: grid;
    grid-auto-flow: column;
    gap: var(--size-5);
    overflow-x: scroll;
    max-inline-size: 75vw;

    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;

    padding: var(--size-3);
    scroll-padding: var(--size-3);

    >.card {
        container-type: scroll-state;
        scroll-snap-align: center;

        inline-size: var(--size-content-2);
        background: var(--surface-2);
        border-radius: var(--radius-3);
        box-shadow: var(--shadow-2);
        overflow: hidden;

        >figure {
            display: grid;
            place-items: end stretch;

            >* {
                grid-area: 1 / 1;
            }

            >figcaption {
                display: grid;
                gap: var(--size-2);
                transition: transform .3s var(--ease-3);
                background: linear-gradient(to top, #000, 75%, #0000);
                padding-inline: var(--size-5);
                padding-block: var(--size-9) var(--size-3);

                & h5 {
                    color: var(--gray-0);
                }

                & p {
                    color: var(--gray-4);
                }
            }
        }

        @supports (container-type: scroll-state) {
            @media (prefers-reduced-motion: no-preference) {
                figcaption {
                    transform: translateY(100%);

                    @container scroll-state(snapped: x) {
                        transform: translateY(0);
                    }
                }
            }
        }
    }

    &::before,
    &::after {
        content: "";
        display: block;
        inline-size: 50vw;
    }
}

*/

export function Carousel2() {
    return <div class="carousel2">
        <article class="card">
            <figure>
                <picture>
                    <img src="https://assets.codepen.io/2585/Roboto.svg" alt="placeholder-hand-drawn-vector" height="500" width="500" />
                </picture>
                <figcaption>
                    <h5>Cyber Jumper</h5>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, neque.</p>
                    <a href="#">Check it out</a>
                </figcaption>
            </figure>
        </article>

        <article class="card">
            <figure>
                <picture>
                    <img src="https://assets.codepen.io/2585/Entertainment.svg" alt="placeholder-hand-drawn-vector" height="500" width="500" />
                </picture>
                <figcaption>
                    <h5>Jam Strut</h5>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <a href="#">Check it out</a>
                </figcaption>
            </figure>
        </article>

        <article class="card">
            <figure>
                <picture>
                    <img src="https://assets.codepen.io/2585/Mechanical+Love.svg" alt="placeholder-hand-drawn-vector" height="500" width="500" />
                </picture>
                <figcaption>
                    <h5>Mechanical Love</h5>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <a href="#">Check it out</a>
                </figcaption>
            </figure>
        </article>

        <article class="card">
            <figure>
                <picture>
                    <img src="https://assets.codepen.io/2585/Waiting.svg" height="500" width="500" />
                </picture>
                <figcaption>
                    <h5>Waiting Patiently</h5>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.</p>
                    <a href="#">Check it out</a>
                </figcaption>
            </figure>
        </article>

        <article class="card">
            <figure>
                <picture>
                    <img src="https://assets.codepen.io/2585/New+Beginnings.svg" alt="placeholder-hand-drawn-vector" height="500" width="500" />
                </picture>
                <figcaption>
                    <h5>New Beginnings Are Beautiful</h5>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                    <a href="#">Check it out</a>
                </figcaption>
            </figure>
        </article>
    </div>
}
