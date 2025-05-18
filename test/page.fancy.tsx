import { createSignal } from "solid-js";
import { Banner, FlickerText, GlitterCard, Marquee, RainbowImage, RainbowText, Skeleton, Terminal, TransitionWidget, TypeWriter } from "../src/fancy/gen";
import { CssUI, GridLayout, Select } from "../src/ui/gen";
import { TestHeader } from "./common";
import { AreaChart, DonutChart } from "../src/chart/area";

function createRandomArray(length, max) {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

let r1 = createRandomArray(10, 100)
let r2 = createRandomArray(10, 100)
let r3 = createRandomArray(10, 100)
let r4 = createRandomArray(10, 100)

export function FancyTest() {

  const [toggle, setToggle] = createSignal(false);

  let [chartType, setChartType] = createSignal<"bar" | "line" | "stacked-bar">()
  let [curveType, setCurveType] = createSignal<"cubic-bezier" | "catmull-rom">()

  return <GridLayout
    header={<TestHeader />}
  >

    <div class="flex gap2 items-center">
      <span>{curveType()}</span>
      <span>{chartType()}</span>

      <Select
        name="curveType"
        setValue={setCurveType}
        initialValue="cubic-bezier"
        options={[
          { value: "cubic-bezier", label: "cubic-bezier" },
          { value: "catmull-rom", label: "catmull-rom" },
        ]} />
      <Select
        name="chartType"
        setValue={setChartType}
        initialValue="line"
        options={[
          { value: "line", label: "line" },
          { value: "bar", label: "bar" },
          { value: "stacked-bar", label: "stacked-bar" },
        ]} />
    </div>

    <AreaChart
      width={600}
      height={300}
      smooth
      curveType={curveType()}
      chartType={chartType()}
      duration={1000}
      data={[
        {
          label: "Guardians of the Galaxy",
          values: toggle() ? r1 : r2,
          lineColor: "#f01b1b",
          areaColor: "#f01b1b55"
        },
        {
          label: "The Avengers",
          values: toggle() ? r3 : r4,
          lineColor: "#0099ff"
        }
      ]}
    />

    <DonutChart
      width={400}
      height={400}
      thickness={50}
      duration={1000}
      data={[
        { label: "Category A", value: 30, color: "#f01b1b" },
        { label: "Category B", value: 45, color: "#0099ff" },
        { label: "Category C", value: 25, color: "#00ff99" }
      ]}
    />

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

    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="rectangular" width={210} height={60} />
    <Skeleton variant="rounded" width={210} height={60} />

    {BannerTest()}

    <FlickerText style={{ "font-size": "50px" }}>Flicker text</FlickerText>

    <RainbowText style={{ "font-size": "50px" }}>Hello</RainbowText>


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

//FN:START
//Banner
//FN:DOC
export function BannerTest() {
  return <Banner title="Tip"
    info="Although most developers will stick to just one UI framework, Rocket supports multiple frameworks in the same project. This allows you to:"
  >
    <ol>
      <li>Choose the framework that is best for each component.
        <ol>
          <li>Nested item 1</li>
          <li>Nested item 2</li>
        </ol>
        ii    </li>
      <li>Learn a new framework without needing to start a new project.</li>
      <li>Collaborate with others even when working in different frameworks.</li>
      <li>Incrementally convert an existing site to another framework with no downtime.</li>
    </ol>
  </Banner>;
}
//FN:END
