import { RainbowText } from '../src/fancy/rainbow';
import { GhostComponent } from '../src/fancy/ghost';
import { GridLayout } from '../src/gen';
import { TestHeader } from './common';

//FN:START
//Ghost
//FN:DOC
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
               ghostColor="#3a3a3a4d"
               waveColor="#8c2ec26c"
               eyeColor='#f8474787'
            />

         </div>
      </GridLayout>
   );
}
//FN:END
