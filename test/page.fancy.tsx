import { createSignal } from "solid-js";
import { Banner, FlickerText, GlitterCard, Marquee, RainbowImage, RainbowText, Terminal, TransitionWidget, TypeWriter } from "../src/fancy/gen";
import { CssUI, GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

export function FancyTest() {

    const [toggle, setToggle] = createSignal(false);

    return <GridLayout
        header={<TestHeader />}
    >

        <Banner title="Tip"
            info="Although most developers will stick to just one UI framework, Rocket supports multiple frameworks in the same project. This allows you to:"
        >
            <ol>
                <li>Choose the framework that is best for each component.
                    <ol>
                        <li>Nested item 1</li>
                        <li>Nested item 2</li>
                    </ol>
                </li>
                <li>Learn a new framework without needing to start a new project.</li>
                <li>Collaborate with others even when working in different frameworks.</li>
                <li>Incrementally convert an existing site to another framework with no downtime.</li>
            </ol>
        </Banner>

        <FlickerText style={{ "font-size": "50px" }}>Flicker text</FlickerText>

        <RainbowText style={{ "font-size": "50px" }}>Hello</RainbowText>

        <TransitionWidget
            showFirstWidget={toggle()}
            one={
                <button class={CssUI.OutlinedButton} style={{ "font-size": "80px" }} onclick={() => setToggle(prev => !prev)}>
                    One
                </button>
            }
            two={
                <button class={CssUI.MaterialButton} style={{ "font-size": "30px" }} onclick={() => setToggle(prev => !prev)}>
                    Two
                </button>
            }
        />

        <Marquee repeatCount={8} child={() =>
            <div class="border-basic p4">
                Hello how are you
            </div>
        } />

        <TypeWriter />

        <GlitterCard />

        <Terminal lines={[
            {
                text: "{ text: > pnpm dlx shadcn@latest init, input: true },",
                input: true,
                color: "yellow"
            },
            {
                text: "{ text: > pnpm dlx shadcn@latest init, input: true }",
                input: true,
                color: "lightgreen"
            },
        ]} />

        <RainbowImage size="300px" src="https://raw.githubusercontent.com/CodeHariK/Shark.run/main/public/images/SpaceShark512.webp"></RainbowImage>

    </GridLayout>
}
