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
        background: var(--disabled-container);
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

import { createSignal, For, JSX, onCleanup, onMount } from "solid-js";
import { CssADV } from "./gen";

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
.tabbar {
    // background: red;
    position: relative;
    display: flex;
    gap: 12px;
    overflow-x: auto;
    // padding: 10px;
    border-bottom: 2px solid #ccc;
    scrollbar-width: none;
}
.tabbar::-webkit-scrollbar {
    display: none;
}

.tab-button, .tab-button:hover {
    position: relative;
    // flex: 1;
    background: none;
    border: none;
    font-size: 1rem;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
    white-space: nowrap;
    z-index: 1;
}


.scroll-list {
    width: 100vw;
    height: 300px;
    padding: 20px;
    display: flex;
    gap: 4vw;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
}
.scroll-list::-webkit-scrollbar {
    display: none;
}

.scroll-list li {
    list-style-type: none;
    background-color: #222222;
    border: 1px solid #ddd;
    padding: 20px;
    flex: 0 0 100%;
    scroll-snap-align: center;
}
.scroll-list li:nth-child(even) {
    background-color: purple;
}

.tab-slider {
    position: absolute;
    bottom: 0;
    height: 100%;
    border-radius: 100px;
    // height: 3px;
    z-index: 0;
    transition: all 1s ease;
    overflow: hidden;
    }
    
.tab-slider-inner {
    width: 100%;
    height: 100%;
    background: dodgerblue;
}

*/

export function Tabs(props: { titles: JSX.Element[] }) {
    const [currentTab, setCurrentTab] = createSignal(0);
    let tabRefs: HTMLElement[] = [];
    let sliderRef: HTMLDivElement | undefined;
    let scrollListRef: HTMLUListElement | undefined;

    let innerRef: HTMLDivElement | undefined;

    const moveSlider = (i: number) => {
        const el = tabRefs[i];
        if (el && sliderRef && innerRef) {
            sliderRef.style.width = `${el.offsetWidth}px`;
            sliderRef.style.transform = `translateX(${el.offsetLeft}px)`;

            // Animate only the inner layer
            innerRef.classList.add("animate-jello");
            const handle = () => {
                innerRef?.classList.remove("animate-jello");
                innerRef?.removeEventListener("animationend", handle);
            };
            innerRef.addEventListener("animationend", handle);
        }
    };

    const scrollToPage = (index: number) => {
        const child = scrollListRef?.children[index] as HTMLElement | undefined;
        if (child && scrollListRef) {
            const left = child.offsetLeft;
            scrollListRef.scrollTo({ left, behavior: "smooth" });
            setCurrentTab(index);
        }
    };

    const setTab = (i: number) => {
        setCurrentTab(i);
        moveSlider(i);
        scrollToPage(i);
    };

    onMount(() => {
        moveSlider(currentTab());

        const onResize = () => moveSlider(currentTab());
        window.addEventListener("resize", onResize);
        onCleanup(() => window.removeEventListener("resize", onResize));
    });

    return (
        <>
            <div class="tabbar">
                <div class="tab-slider" ref={sliderRef}>
                    <div class="tab-slider-inner" ref={innerRef} />
                </div>
                {props.titles.map((name, i) => (
                    <button
                        class={`tab-button ${currentTab() === i ? "active" : ""}`}
                        onClick={() => setTab(i)}
                        ref={(el) => (tabRefs[i] = el)}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <ul class="scroll-list" ref={scrollListRef}>
                {props.titles.map((page) => (
                    <li>
                        <h2>{page}</h2>
                    </li>
                ))}
            </ul>
        </>
    );
}

/*CSS:

.carousel3d {
  width: 100vw;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 600px;
  --items: 5;
  --middle: 3;
  --position: 1;
  pointer-events: none;
  position: relative;

  li {
  position: absolute;
  width: 300px;
  height: 400px;
  background-color: coral;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 10px;
  --r: calc(var(--position) - var(--offset));
  --abs: max(calc(var(--r) * -1), var(--r));
  transition: all 0.4s ease;
  transform: rotateY(calc(-10deg * var(--r)))
    translateX(calc(-300px * var(--r)));
  z-index: calc((var(--items) - var(--abs)));
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.controls button {
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
}
*/

const TOTAL_ITEMS = 5;
const MIDDLE = 3;

export function Carousel3D() {
    const [position, setPosition] = createSignal(1);

    const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => i + 1);

    const prev = () => setPosition((p) => Math.max(1, p - 1));
    const next = () => setPosition((p) => Math.min(TOTAL_ITEMS, p + 1));

    return (
        <>
            <ul
                class="carousel3d"
                style={{
                    "--items": TOTAL_ITEMS,
                    "--middle": MIDDLE,
                    "--position": position(),
                }}
            >
                <For each={items}>
                    {(item, i) => (
                        <li
                            class="item"
                            style={{
                                "--offset": i() + 1,
                            }}
                        >
                            <h2>Item {item}</h2>
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
