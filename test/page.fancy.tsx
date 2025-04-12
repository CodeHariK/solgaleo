import { FlickerText, Marquee, RainbowImage, RainbowText, Terminal, TypeWriter } from "../src/fancy/gen";
import { GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

export function FancyTest() {
    return <GridLayout
        header={<TestHeader />}
    >
        <FlickerText text="Flicker text" />

        {/* <GlitterCard /> */}

        <Terminal lines={[
            {
                text: "{ text: > pnpm dlx shadcn@latest init, input: true },",
                input: true,
                color: "red"
            },
            {
                text: "{ text: > pnpm dlx shadcn@latest init, input: true },",
                input: true,
                color: "blue"
            },
        ]} />

        <Marquee />

        <RainbowText>Hello</RainbowText>

        <RainbowImage size="300px" src="https://raw.githubusercontent.com/CodeHariK/Shark.run/main/public/images/SpaceShark512.webp"></RainbowImage>

        <TypeWriter />

    </GridLayout>
}
