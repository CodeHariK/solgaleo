/*CSS:*

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
        border: 1px solid var(--primary-container);
        color: var(--primary);
        margin: 5px;
        background: var(--primary-container);
    }
    &::scroll-button(*):focus-visible {
        outline-offset: 5px;
    }
    &::scroll-button(*):disabled {
        color: var(--disabled);
        background: var(--disabled-container);
    }
    &::scroll-button(*):not(:disabled):is(:hover, :active) {
        background-color: var(--primary-container);
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
    }

    & > li {
        &::scroll-marker {
            content: " "; 

            border: 1px solid var(--primary-container);
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
                background: linear-gradient(to top, #000, 75%, #0000);
                padding-inline: 1.5rem;
                padding-block: 4rem 1rem;

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