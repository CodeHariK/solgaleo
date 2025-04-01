import "../css/glittercard.css"

import { onCleanup, onMount } from "solid-js";

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
