import { createSignal } from "solid-js";
import { FlickerText, Marquee, RainbowImage, RainbowText, Terminal, TransitionWidget, TypeWriter } from "../src/fancy/gen";
import { CssUI, GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

export function FancyTest() {

    const [toggle, setToggle] = createSignal(false);

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

        <TransitionWidget
            showFirstWidget={toggle()}
            one={
                <button class={CssUI.OutlinedButton} onclick={() => setToggle(prev => !prev)}>
                    One
                </button>
            }
            two={
                <button class={CssUI.MaterialButton} onclick={() => setToggle(prev => !prev)}>
                    Two
                </button>
            }
        />


    </GridLayout>
}
