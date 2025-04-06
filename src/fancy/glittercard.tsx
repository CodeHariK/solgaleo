import { onCleanup, onMount } from "solid-js";

/*CSS:
.card {
    width: 100%;
    max-width: 400px;
    background: linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9));
    border-radius: 16px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transform-style: preserve-3d;
    transform: perspective(1000px);
    transition: all 0.3s ease;
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg,
            rgba(131, 58, 180, 0.3),
            rgba(253, 29, 29, 0.3),
            rgba(252, 176, 69, 0.3));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.card:hover {
    transform: perspective(1000px) translateZ(20px);
}

.card:hover::before {
    opacity: 1;
}

.badge {
    display: inline-block;
    padding: 0.5em 1em;
    background: linear-gradient(45deg, #833ab4, #fd1d1d);
    border-radius: 20px;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.title {
    font-size: 1.8rem;
    color: white;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #fff, #ccc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.card .description {
    color: #aaa;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat {
    text-align: center;
}

.stat-value {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
}

.stat-label {
    color: #666;
    font-size: 0.8rem;
    text-transform: uppercase;
}
*/

export function GlitterCard() {
    let cardRef: HTMLDivElement | undefined;

    onMount(() => {
        if (!cardRef) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef) return;
            const rect = cardRef.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            cardRef.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        };

        const handleMouseLeave = () => {
            if (!cardRef) return;
            cardRef.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
        };

        cardRef.addEventListener("mousemove", handleMouseMove);
        cardRef.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup when component unmounts
        onCleanup(() => {
            cardRef?.removeEventListener("mousemove", handleMouseMove);
            cardRef?.removeEventListener("mouseleave", handleMouseLeave);
        });
    });

    return (
        <div ref={cardRef} class="card">
            <span class="badge">Featured</span>
            <h2 class="title">Modern Design Card</h2>
            <p class="description">
                A beautifully crafted card component featuring glassmorphism, smooth animations,
                and gradient accents. Perfect for showcasing content in a modern and elegant way.
            </p>
            <div class="stats">
                <div class="stat">
                    <div class="stat-value">100%</div>
                    <div class="stat-label">Responsive</div>
                </div>
                <div class="stat">
                    <div class="stat-value">Modern</div>
                    <div class="stat-label">Design</div>
                </div>
                <div class="stat">
                    <div class="stat-value">Smooth</div>
                    <div class="stat-label">Animations</div>
                </div>
            </div>
        </div>
    );
}
