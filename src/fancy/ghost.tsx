import { onCleanup, onMount } from "solid-js";
import { CssFANCY } from "./gen";

/*CSS:
.GhostCon {
    --ghostWaveColor: var(--primary);
    --ghostColor: var(--primary-container);
    --ghostEyeColor: var(--secondary);
    --ghostCircleSize: 10px;
    --ghostCircleDistance: 5px;
    --ghostCircleRadius: 11.18px;

    position: fixed; 
    top: 0; 
    left: 0;
    padding: 50px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 9999;
}

.ghost {
    background: sol(--ghostColor);
    width: 120px;
    height: 150px;
    border-radius: 100px 100px 0 0;
    box-shadow: 0 0 50px sol(--ghostColor);
    position: relative;
    transform-origin: center;
    animation: float 3s ease-out infinite;
}

.GhostEyes {
    display: flex;
    gap: 25px;
    padding-top: 44px;
    justify-content: center;
    position: relative;
}

.GhostEye {
    width: 10px;
    height: 16px;
    border: 6px solid sol(--ghostEyeColor);
    border-radius: 100px;
    clip-path: polygon(100% 50%, 100% 100%, 0 100%, 0 50%);
    transition: .1s;
}

.ghost:hover .GhostEye,
.GhostCon.active .GhostEye {
    background: sol(--ghostWaveColor);
    border-color: sol(--ghostEyeColor);
    clip-path: none;
    height: 25px;
}

.GhostWaves {
    display: flex;
    position: absolute;
    bottom: -32px;
    height: 30px;
    width: 100%;
    overflow: hidden;
}

.GhostWave {
    width: 200%;
    height: 30px;
    background: sol(--ghostWaveColor);
    flex-shrink: 0;

    animation: ghost-wave 3s linear infinite;

    -webkit-mask:
        radial-gradient(sol(--ghostCircleRadius) at 50% calc(100% - (sol(--ghostCircleSize) + sol(--ghostCircleDistance))), blue 99%, #0000 101%) calc(50% - 2 * sol(--ghostCircleSize)) 0/calc(4 * sol(--ghostCircleSize)) 100%,
        radial-gradient(sol(--ghostCircleRadius) at 50% calc(100% + sol(--ghostCircleDistance)), #0000 99%, red 101%) 50% calc(100% - sol(--ghostCircleSize))/calc(4 * sol(--ghostCircleSize)) 100% repeat-x;
}

.GhostMouth {
    width: 44px;
    height: 8px;
    background: sol(--ghostEyeColor);
    border-radius: 10px;
    margin: 16px auto 0;
    position: relative;
    animation: sleep 3s ease-out infinite;
    transition: .1s;
}

.ghost:hover .GhostMouth:before,
.GhostCon.active .GhostMouth:before {
    display: none;
}

.ghost:hover .GhostMouth,
.GhostCon.active .GhostMouth {
    animation: none;
    background: sol(--ghostEyeColor);
    width: 32px;
    height: 29px;
    clip-path: polygon(100% 50%, 100% 100%, 0 100%, 0 50%);
    border-radius: 100px;
    margin-top: 1px;
}

.GhostCon.active .ghost {
    animation: none;
}

@keyframes ghost-wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
@keyframes sleep {
    0% { width: 44px; }
    50% { width: 26px; }
    100% { width: 44px; }
}
@keyframes float {
    50% { transform: translate(0, 20px); }
}

*/

export const GhostComponent = ({ ghostColor, waveColor, eyeColor }: {
    ghostColor?: string,
    waveColor?: string,
    eyeColor?: string
}) => {
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

        targetX = event.pageX - 100
        targetY = event.pageY - 20

        if (!moving) {
            moving = true;
            animateGhost();
        }
    };

    const animateGhost = () => {
        if (!ghost) {
            return;
        }

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

        const skewDegrees = linearMap(skewX, 0, 50, 0, -15);
        const scaleYValue = linearMap(scale, 0, 50, 1, 1.5);

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

    return <div class={CssFANCY.GhostCon} ref={ghost}>
        <div class={CssFANCY.Ghost}
            style={{
                [CssFANCY.varGhostColor]: ghostColor,
                [CssFANCY.varGhostWaveColor]: waveColor,
                [CssFANCY.varGhostEyeColor]: eyeColor,
            }}
        >
            <div class="GhostWaves">
                <div class="GhostWave"></div>
            </div>
            <div class="GhostEyes">
                <div class="GhostEye"></div>
                <div class="GhostEye"></div>
            </div>
            <div class="GhostMouth"></div>
        </div>
    </div>
}