import { SpaceLayout } from '../layouts/SpaceLayout';

import { onCleanup, onMount } from "solid-js";
import { Footer } from '../components/footer';
import { Header } from '../components/header';

import '../css/ghost.css';
import { ThemeToggle } from '../components/theme_toggle';
import { RainbowText } from '../components/rainbow';

export function NotFound() {
   return (
      <SpaceLayout two contentCenter={true} title='Page Not Found'
         header={<Header rightChildren={<ThemeToggle />} />}
         footer={<Footer />}>

         <section>
            <div class="mx-auto max-w-screen-sm text-center">
               <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
               <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
               <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
               <h1 class="text-center p-2 font-mono bg-pink-200/20 m-4 border border-white/25 rounded text-decoration-none">
                  <a title="Return to Home" href=".">
                     <RainbowText>Return to Home</RainbowText>
                  </a>
               </h1>
            </div>

            <p class='plac'>Hello</p>

            <GhostComponent
               ghostColor="#0f0;"
               ghostDarkColor="#ff0;"
            />

         </section>

      </SpaceLayout>
   );
}

const GhostComponent = ({ ghostColor, ghostDarkColor }: { ghostColor?: string, ghostDarkColor?: string }) => {
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
      <div class="ghost" style={`background: ${ghostDarkColor}; color: ${ghostColor}`}>
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
};
