import { Marquee, RainbowImage } from "../src/fancy/gen";

export function FancyTest() {
    return <>
        {/* <FlickerText text="Flicker text" /> */}

        {/* <GlitterCard /> */}

        <Marquee />

        {/* <Terminal
             lines={[
                 { text: "> pnpm dlx shadcn@latest init", input: true },
                 { text: "✔ Preflight checks.", color: "text-green-500" },
                 { text: "You may now add components.", color: "text-muted-foreground", input: true },
             ]}
         />

         {TypeWriter()} */}

        <RainbowImage size="300px" src="https://raw.githubusercontent.com/CodeHariK/Shark.run/main/public/images/SpaceShark512.webp"></RainbowImage>

    </>
}
