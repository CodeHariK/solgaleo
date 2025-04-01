import { onCleanup, onMount } from "solid-js";

export const GhostComponent = ({ ghostColor, waveColor }: { ghostColor?: string, waveColor?: string }) => {
    let ghost: HTMLDivElement | undefined;

    let ghostX = 0;
    let ghostY = 0;
    let targetX = 0;
    let targetY = 0;
    let moving = false;

    const linearMap = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
        ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

    const handleMouseMove = (event: MouseEvent) => {
        ghost!.classList.add("active");

        targetX = event.pageX - 55;
        targetY = event.pageY - 550;

        if (!moving) {
            moving = true;
            animateGhost();
        }
    };

    const animateGhost = () => {
        if (!ghost) return;

        const diffX = targetX - ghostX;
        const diffY = targetY - ghostY;

        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < 2) {
            moving = false;
            return;
        }

        const skewX = diffX / 16;
        const scale = diffY / 16;

        ghostX += diffX / 10;
        ghostY += diffY / 10;

        const skewDegrees = linearMap(skewX, 0, 50, 0, -25);
        const scaleYValue = linearMap(scale, 0, 50, 1, 2.0);

        ghost.style.transform = `translate(${ghostX}px, ${ghostY}px) skew(${skewDegrees}deg) rotate(${-skewDegrees}deg) scaleY(${scaleYValue})`;

        requestAnimationFrame(animateGhost);
    };

    onMount(() => {
        const handleMouseLeave = () => {
            ghost?.classList.remove('active');
            if (ghost) ghost.style.animation = "none";

            targetX = ghostX + (targetX - ghostX) * 0.9;
            targetY = ghostY + (targetY - ghostY) * 0.9;

            if (!moving) {
                moving = true;
                animateGhost();
            }
        };

        document.addEventListener("mouseenter", handleMouseMove);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Clean up event listeners when the component is unmounted
        onCleanup(() => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        });
    });

    return <div id="ghost" ref={ghost}>
        <div class="ghost"
            style={{
                "--ghostColor": ghostColor || "#a81fac87",
                "--waveColor": waveColor || "#ffff0091",
            }}
        >
            <div class="ghost__waves">
                <div class="ghost__wave"></div>
            </div>
            <div class="ghost__eyes">
                <div class="ghost__eyes_eye"></div>
                <div class="ghost__eyes_eye"></div>
            </div>
            <div class="ghost__mouth"></div>
        </div>
    </div>;
}