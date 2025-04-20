/*CSS:*

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
