import { createSignal } from "solid-js";
import { Grid, GridLayout, Select } from "../src/ui/gen";
import { TestHeader } from "./common";
import { AreaChart, CircleChart, RadarChart } from "../src/gen";

function createRandomArray(length, max) {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

let r1 = createRandomArray(5, 100)
let r2 = createRandomArray(5, 100)
let r3 = createRandomArray(5, 100)
let r4 = createRandomArray(5, 100)

export function ChartTest() {

  const [toggle, setToggle] = createSignal(false);

  let [chartType, setChartType] = createSignal<"bar" | "line" | "stacked-bar">()
  let [curveType, setCurveType] = createSignal<"linear" | "cubic-bezier" | "catmull-rom">()

  return <GridLayout
    header={<TestHeader />}
  >

    <div class="flex">

      <button onClick={() => { setToggle(!toggle()) }}>Toggle</button>

      <Select
        name="curveType"
        setValue={setCurveType}
        initialValue="cubic-bezier"
        options={[
          { value: "linear", label: "linear" },
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

    <Grid cols={2} rows={2}>

      <AreaChart
        width={300}
        height={150}
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

      <RadarChart
        radius={100}
        gridCount={5}
        duration={1000}
        labels={["Speed", "Power", "Range", "Defense", "Agility"]}
        padding={40}
        style={{
          fontSize: 14,
          fontColor: '#333333',
          gridColor: '#e0e0e0',
          axisColor: '#cccccc'
        }}
        data={[
          {
            label: "Guardians of the Galaxy",
            values: toggle() ? r1 : r2,
            color: "#f01b1b",
            fillColor: "#f01b1b33"
          },
          {
            label: "The Avengers",
            values: toggle() ? r3 : r4,
            color: "#0099ff"
          }
        ]}
      />

      <CircleChart
        radius={100}
        thickness={20}
        duration={1000}
        data={[
          { label: "Category A", value: toggle() ? 30 : 40, color: "#f01b1b" },
          { label: "Category B", value: toggle() ? 45 : 10, color: "#0099ff" },
          { label: "Category C", value: toggle() ? 25 : 40, color: "#00ff99" }
        ]}
      />
    </Grid>

  </GridLayout>
}
