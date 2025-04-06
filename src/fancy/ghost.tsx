import { onCleanup, onMount } from "solid-js";

/*CSS:
#ghost {
    position: absolute;
}

.ghost {
    background: var(--ghostColor);
    width: 120px;
    height: 150px;
    border-radius: 100px 100px 0 0;
    box-shadow: 0 0 50px var(--ghostColor);
    position: relative;
    transform-origin: center;
    animation: float 3s ease-out infinite;
}

.ghost__eyes {
    display: flex;
    gap: 25px;
    padding-top: 44px;
    justify-content: center;
    position: relative;
}

.ghost__eyes_eye {
    width: 10px;
    height: 16px;
    border: 6px solid var(--waveColor);
    border-radius: 100px;
    clip-path: polygon(100% 50%, 100% 100%, 0 100%, 0 50%);
    transition: .1s;
}

.ghost:hover .ghost__eyes_eye,
#ghost.active .ghost__eyes_eye {
    background: var(--waveColor);
    border-color: yellow;
    clip-path: none;
    height: 25px;
}

.ghost__waves {
    display: flex;
    position: absolute;
    bottom: -32px;
    height: 30px;
    width: 100%;
    overflow: hidden;
}

.ghost__wave {
    width: 200%;
    height: 30px;
    background: var(--waveColor);
    flex-shrink: 0;

    animation: ghost-wave 3s linear infinite;

    --size: 10px;
    --p: 5px;
    --R: 11.18px;

    -webkit-mask:
        radial-gradient(var(--R) at 50% calc(100% - (var(--size) + var(--p))), blue 99%, #0000 101%) calc(50% - 2*var(--size)) 0/calc(4*var(--size)) 100%,
        radial-gradient(var(--R) at 50% calc(100% + var(--p)), #0000 99%, red 101%) 50% calc(100% - var(--size))/calc(4*var(--size)) 100% repeat-x;
}

.ghost__mouth {
    width: 44px;
    height: 8px;
    background: #000;
    border-radius: 10px;
    margin: 16px auto 0;
    position: relative;
    animation: sleep 3s ease-out infinite;
    transition: .1s;
}

.ghost:hover .ghost__mouth:before,
#ghost.active .ghost__mouth:before {
    display: none;
}

.ghost:hover .ghost__mouth,
#ghost.active .ghost__mouth {
    animation: none;
    background: #000;
    width: 32px;
    height: 29px;
    clip-path: polygon(100% 50%, 100% 100%, 0 100%, 0 50%);
    border-radius: 100px;
    margin-top: 1px;
}

#ghost.active .ghost {
    animation: none;
}

@keyframes ghost-wave {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

@keyframes sleep {
    0% {
        width: 44px;
    }

    50% {
        width: 26px;
    }

    100% {
        width: 44px;
    }
}

@keyframes float {
    50% {
        transform: translate(0, 20px);
    }
}
*/

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