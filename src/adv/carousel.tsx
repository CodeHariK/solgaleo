import { Accessor, createEffect, createSignal, For, JSX, onCleanup, onMount, Show } from "solid-js";
import { CssADV } from "./gen";
import { IconChevronLeft, IconChevronRight } from "../svg/svg";
import { CssUI } from "../gen";

/*CSS:

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
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;

    scroll-marker-group: after;

    scrollbar-width: none;

    // max-inline-size: 80cqi;
    // scroll-behavior: smooth;


    display: grid;
    grid-auto-flow: column;
    gap: 1.5rem;
    // overflow-x: scroll;
    padding: 1rem;
    // scroll-padding: var(20rem);


    grid: none / auto-flow 40vmin;

    gap: 15px;
    margin: 0;

    &::scroll-button(*) {
        inline-size: 48px;
        aspect-ratio: 1;
        border-radius: 1e3px;
        border: 1px solid var(--primary-bg);
        color: var(--primary);
        margin: 5px;
        background: var(--primary-bg);
    }
    &::scroll-button(*):focus-visible {
        outline-offset: 5px;
    }
    &::scroll-button(*):disabled {
        color: var(--disabled);
        background: var(--disabled-bg);
    }
    &::scroll-button(*):not(:disabled):is(:hover, :active) {
        background-color: var(--primary-bg);
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

    &::scroll-marker-group {
        // grid-area: markers;

        // display: grid;
        // place-content: safe center;
        // grid: 30px / auto-flow 30px;
        // gap: 45px;
        padding: 15px;
        // scroll-padding: 15px;

        display: flex;
        gap: 0.4em;
        align-items: center;
        place-content: center;

        overflow: auto;
        overscroll-behavior-x: contain;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;
    }

    & > li {

        counter-increment: markers;

        &::scroll-marker {
            content: " "; 
            // content: counter(markers);

            // width: fit-content;
            // height: 1em;
            padding: 15px;
            text-decoration: none;

            border: 1px solid var(--primary-bg);
            border-radius: 20%;
            outline-offset: 4px;
            -webkit-tap-highlight-color: transparent;

            scroll-snap-align: center;
        }
        &::scroll-marker:is(:hover, :focus-visible) {
            border-color: var(--primary);
        }
        &::scroll-marker:target-current {
            background: var(--primary);
        }
        // &:first-child::scroll-marker {
        //     content: "First";
        // }
        // &:last-child::scroll-marker {
        //     content: "Last";
        // }

    }

    & > li {

        list-style-type: none;
        border: 1px solid #88888844;


        scroll-snap-align: center;
        container-type: scroll-state;
        
        // inline-size: 45ch;
        // background: var(--surface-2);
        // border-radius: var(--radius-3);
        // box-shadow: var(--shadow-2);
        overflow: hidden;

        >figure {
            display: grid;
            place-items: end stretch;

            >* {
                grid-area: 1 / 1;
                overflow: hidden;
            }

            >figcaption {
                display: grid;
                gap: .5rem;
                transition: transform .3s var(--ease-3);
                background: linear-gradient(to top, var(--secondary-bg), 75%, transparent);
                padding-inline: 1.5rem;
                padding-block: 4rem 1rem;

                & h5 {
                    color: var(--primary);
                }

                & p {
                    color: var(--secondary);
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
}

*/

export function Carousel() {
    return (
        <div class="scroll-layout">
            <ul class="carousel">
                {imgs.map((src) => {
                    return <li class="">
                        <figure>
                            <picture>
                                <img src={src} alt="placeholder-hand-drawn-vector" height="500" width="500" />
                            </picture>
                            <figcaption>
                                <h5>New Beginnings Are Beautiful</h5>
                                <p>{
                                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.".substring(10, parseInt((Math.random() * 200).toFixed(0)))
                                }
                                </p>
                                <a href="#">Check it out</a>
                            </figcaption>
                        </figure>
                    </li>
                })}
            </ul>
        </div>
    );
}

let imgs = [
    "https://assets.codepen.io/2585/Roboto.svg",
    "https://assets.codepen.io/2585/Entertainment.svg",
    "https://assets.codepen.io/2585/Mechanical+Love.svg",
    "https://assets.codepen.io/2585/Waiting.svg",
    "https://assets.codepen.io/2585/New+Beginnings.svg",
]

/*CSS:
.vcarousel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    overscroll-behavior-y: contain;
    list-style-type: none;
    padding: 0;
    margin: 0;
    // height: 100%;
}

.vcarousel li {
    scroll-snap-align: center;
}

*/

export function VCarousel({ children, listStyle, itemStyle }: {
    children: JSX.Element[],
    listStyle?: JSX.CSSProperties,
    itemStyle?: JSX.CSSProperties,
}) {
    return (
        <ul class={CssADV.Vcarousel} style={listStyle}>
            <For each={children}>
                {(child) => (
                    <li style={itemStyle}>
                        {child}
                    </li>
                )}
            </For>
        </ul>
    );
}

/*CSS:
.TabBar {
    width: 100%;
    position: relative;
    display: flex;
    gap: 10px;
    flex: 0 0 auto;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    // justify-content: center;
    // scrollbar-width: none;
    
    // ::-webkit-scrollbar {
    //     display: none;
    // }
}

.TabButton, .TabButton:hover {
    // flex: 1;
    flex: 0 0 auto;
    white-space: nowrap;
    background: none;
    z-index: 1;
}

.TabButtonActive {
    border: 1px solid purple;
}

.Tabby {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 5px;
    // height: 100%;
    background: var(--primary-bg);
    border-radius: 100px;
    z-index: 0;
    transition: all .5s ease;
    overflow: hidden;
}
*/

export function TabBar(props: {
    titles: JSX.Element[],
    onTabChange: (index: number) => void,

    pagination?: { totalItems: number, itemsPerPage: number },

    tabBarStyle?: JSX.CSSProperties,
    tabButtonStyle?: JSX.CSSProperties,
}) {
    const [currentTab, setCurrentTab] = createSignal(0);
    let tabRefs: HTMLElement[] = [];
    let sliderRef: HTMLDivElement | undefined;

    const moveSlider = (i: number) => {
        const el = tabRefs[i];
        const tabbar = el?.parentElement as HTMLElement;

        if (el && tabbar && sliderRef) {
            let offset = el.offsetLeft;

            sliderRef.style.width = `${el.offsetWidth}px`;
            sliderRef.style.left = `${offset}px`;

            sliderRef.classList.add("animate-jello");
            const handle = () => {
                sliderRef?.classList.remove("animate-jello");
                sliderRef?.removeEventListener("animationend", handle);
            };
            sliderRef.addEventListener("animationend", handle);
        }
    };

    const setTab = (i: number) => {
        setCurrentTab(i);
        moveSlider(i);
        props.onTabChange(i)
    };

    onMount(() => {
        moveSlider(currentTab());

        const onResize = () => moveSlider(currentTab());
        window.addEventListener("resize", onResize);
        onCleanup(() => window.removeEventListener("resize", onResize));
    });

    let paginationArray = () => {
        let itemsPerPage = props.pagination.itemsPerPage
        let totalItems = props.pagination.totalItems
        let ll = Math.floor(currentTab() / itemsPerPage)
        let items = Array.from(
            { length: (ll + 1) * itemsPerPage > totalItems ? (ll + 1) * itemsPerPage - totalItems : itemsPerPage },
            (_, i) => i + ll * itemsPerPage)

        return items
    }

    return <div class={CssADV.TabBar} style={props.tabBarStyle}>

        <div class={CssADV.Tabby} ref={sliderRef} />

        <Show when={props.pagination}>
            <button class={CssUI.ButtonIcon}
                onClick={() => {
                    if (currentTab() > 0) {
                        setTab(currentTab() - 1)
                    }
                }}
                disabled={Math.floor(currentTab() / props.pagination.itemsPerPage) === 0}
                aria-label="Previous page"
            >
                <IconChevronLeft />
            </button>
        </Show>

        <Show when={!props.pagination}>
            {props.titles.map((name, i) => (
                <button style={props.tabButtonStyle}
                    class={`${CssADV.TabButton} ${currentTab() === i ? CssADV.TabButtonActive : ""}`}
                    onClick={() => setTab(i)}
                    ref={(el) => (tabRefs[i] = el)}
                >
                    {name}
                </button>
            ))}
        </Show>

        <Show when={props.pagination}>
            <For each={paginationArray()}>
                {(index) => (
                    <button
                        style={props.tabButtonStyle}
                        class={`${CssADV.TabButton} ${currentTab() === index ? CssADV.TabButtonActive : ""}`}
                        onClick={() => setTab(index)}
                        ref={(el) => (tabRefs[index] = el)}
                    >
                        {index + 1}
                    </button>
                )}
            </For>
        </Show>

        <Show when={props.pagination}>
            <button class={CssUI.ButtonIcon}
                onClick={() => {
                    if (currentTab() < props.pagination.totalItems) {
                        setTab(currentTab() + 1)
                    }
                }}
                disabled={Math.floor(currentTab() / props.pagination.itemsPerPage) === Math.floor(props.pagination.totalItems / props.pagination.itemsPerPage)}
                aria-label="Next page"
            >
                <IconChevronRight />
            </button>
        </Show>

    </div>
}

/*CSS:
.HList {
    display: flex;
    padding: 0;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    li {
        list-style-type: none;
        flex: 0 0 100%;
        scroll-snap-align: center;
    }
}
*/

export function HList(props: {
    pages: JSX.Element[],
    index: Accessor<number>,
    style?: JSX.CSSProperties
    pageStyle?: JSX.CSSProperties
}) {

    let scrollListRef: HTMLUListElement | undefined;

    const scrollToPage = (index: number) => {
        const child = scrollListRef?.children[index] as HTMLElement | undefined;
        if (child && scrollListRef) {
            const left = child.offsetLeft;
            console.log(left)
            scrollListRef.scrollTo({ left, behavior: "smooth" });
        }
    };

    createEffect(() => {
        scrollToPage(props.index())
    })

    return <ul
        class={CssADV.HList}
        style={props.style}
        ref={scrollListRef}
    >
        {props.pages.map((page) => (
            <li style={props.pageStyle}>{page}</li>
        ))}
    </ul>;
}

/*CSS:

.Carousel3D {
    --items: 5;
    --position: 1;

    // position: relative;
    // width: 100%;

    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    transform-style: preserve-3d;
    perspective: 600px;
    pointer-events: none;

    li {
        position: absolute;
        width: 300px;
        height: 400px;
        list-style: none;
        
        display: flex;
        background-color: coral;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        border-radius: 10px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        
        --r: calc(var(--position) - var(--offset));
        --abs: max(calc(var(--r) * -1), var(--r));
        transition: all 0.4s ease;
        transform: rotateY(calc(-10deg * var(--r)))
            translateX(calc(-300px * var(--r)));
        z-index: calc((var(--items) - var(--abs)));
    }

}

.controls {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    justify-content: center;
}

*/

export function Carousel3D(props: { items: JSX.Element[], current?: number }) {
    const [position, setPosition] = createSignal(props.current ?? 1);

    const prev = () => setPosition((p) => Math.max(1, p - 1));
    const next = () => setPosition((p) => Math.min(props.items.length, p + 1));

    return (
        <>
            <ul
                class={CssADV.Carousel3D}
                style={{
                    "--items": props.items.length,
                    "--position": position(),
                }}
            >
                <For each={props.items}>
                    {(item, i) => (
                        <li
                            class="item"
                            style={{
                                "--offset": i() + 1,
                            }}
                        >
                            {item}
                        </li>
                    )}
                </For>
            </ul>
            <div class="controls">
                <button onClick={prev}>◀</button>
                <button onClick={next}>▶</button>
            </div>
        </>
    );
}


/*CSS:

.Slides {
    scroll-snap-type: y mandatory;
    overflow-y: auto; 
    height: 40vh;

    section {
        display: flex;
        align-items: center;
        justify-content: center;

        container-type: scroll-state;
        scroll-snap-align: start;

        min-block-size: 40vh;
        scroll-snap-stop: always;

        @supports (container-type: scroll-state) {
            >h1 {
                transition: opacity .5s ease, transform .5s var(--ease-spring-3);
                transition-delay: .5s;
                opacity: 0;
                transform: scale(1.25);

                @container scroll-state(snapped: block) {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        }
    }

    section:nth-of-type(even) {
        color: hsl(320 80% 90%);
        background: hsl(320 80% 40%);
    }

    section:nth-of-type(odd) {
        color: hsl(290 80% 90%);
        background: hsl(290 80% 40%);
    }
}

*/

export function Slides() {
    return <article class="Slides">
        <section>
            <h1>slide 1</h1>
        </section>
        <section>
            <h1>slide 2</h1>
        </section>
        <section>
            <h1>slide 3</h1>
        </section>
        <section>
            <h1>slide 4</h1>
        </section>
        <section>
            <h1>slide 5</h1>
        </section>
    </article>
}
