import { RainbowText } from '../src/fancy/rainbow';
import { GhostComponent } from '../src/fancy/ghost';
import { GridLayout } from '../src/gen';
import { TestHeader } from './common';

export function NotFound() {
   return (
      <GridLayout
         title='Page Not Found'
         header={<TestHeader />}
      >
         <div class="flex flex-col justify-center items-center gap8 h-full">
            <h1>404 - Page Not Found</h1>
            <a title="Return to Home" href=".">
               <RainbowText>Return to Home</RainbowText>
            </a>

            <GhostComponent
               ghostColor="#bb42e34d"
               waveColor="#8c2ec26c"
               eyeColor='#f8e14788'
            />

         </div>
      </GridLayout>
   );
}
