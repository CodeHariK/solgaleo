import { FlickerText, Marquee, RainbowImage, RainbowText, Terminal, TypeWriter } from "../src/fancy/gen";

export function FancyTest() {
    return <>
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

    </>
}
