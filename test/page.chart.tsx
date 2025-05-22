import { createSignal } from "solid-js";
import { Grid, GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";
import { AreaChart, CircleChart, RadarChart } from "../src/gen";

function createRandomArray(length, max) {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

let r1 = createRandomArray(5, 100)
let r2 = createRandomArray(5, 100)
let r3 = createRandomArray(5, 100)
let r4 = createRandomArray(5, 100)

//FN:START
//Chart
//FN:DOC
export function ChartTest() {

  const [toggle, setToggle] = createSignal(false);

  return <GridLayout
    header={<TestHeader />}
  >

    <button onClick={() => { setToggle(!toggle()) }}>Toggle</button>

    <Grid cols={2} rows={1}>

      <AreaChart
        curveType={"catmull-rom"}
        chartType={"line"}
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

      <AreaChart
        chartType={"bar"}
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

      <AreaChart
        chartType={"stacked-bar"}
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
//FN:END
