
import { Footer } from '../nav/footer';
import { Header } from '../nav/header';

import { ThemeToggle } from '../ui/theme_toggle';
import { RainbowText } from '../fancy/rainbow';
import { GhostComponent } from '../fancy/ghost';
import { SpaceLayout } from '../layouts/SpaceLayout';

export function NotFound() {
   return (
      <SpaceLayout title='Page Not Found'
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

            <GhostComponent
               ghostColor="#00ff00"
               waveColor="#ff0"
            />

         </section>

      </SpaceLayout>
   );
}
