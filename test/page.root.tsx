import { createSignal, onCleanup, onMount } from "solid-js";
import { VCarousel } from "../src/adv/gen";
import { Accordion, GridLayout, useSolContext } from "../src/ui/gen";
import { RandomColor } from "../src/utils/color";
import { TestHeader } from "./common";
import { CssTEST } from "./gen";

import Prism from "prismjs"; // Explicitly import Prism
import "prismjs/components/prism-typescript.min.js"; // Load Go syntax support

/*CSS:*
.CodeCard {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition: transform 0.2s ease-in-out;

    :hover {
        transform: translateY(-2px);
    }
}
*/

//FN:START
//Hello
//FN:DOC
export function Hello() {
  return <div>
    Hello
  </div>
}
//FN:END

export function RootPage() {

  const { getTheme } = useSolContext()

  const light = () => getTheme()?.type == "light"

  const [codeIndex, setCodeIndex] = createSignal(0);

  return <Code code={goCode} lang="ts" />

  return <GridLayout

    childrenStyle={{
      "align-content": "center",
    }}

    header={<TestHeader />}

    left={<VCarousel
      children={CssTEST.Docs.map((c, i) => {
        return <div
          class={CssTEST.CodeCard}
          style={{
            "border": `2px solid ${RandomColor({ lightness: light() ? 50 : 30 })}`,
            "border-radius": "1rem",
            overflow: "clip"
          }}
          onClick={() => {
            console.log(i)
            setCodeIndex(i)
          }}
        >
          <Accordion
            title={<div style={{
              background: i == codeIndex() ? "var(--primary-container)" : "",
              padding: "1rem",
            }}>
              {c.doc}
            </div>}

            contentStyle={{
              padding: "1rem",
            }}

            children={<pre>
              {c.data}
            </pre>} />
        </div>
      })}
      listStyle={{ padding: "1rem" }}
      itemStyle={{}}
    />}

    gridStyle={{
      "grid-template-columns": "minmax(200px, 45%) 1fr"
    }}
  >
    <>{CssTEST.Docs[codeIndex()].element()}</>
  </GridLayout>
}

export function Code({ code, lang }: { code: string; lang: string }) {
  let codeRef: HTMLPreElement | undefined;
  const [highlightedCode, _setHighlightedCode] = createSignal(code);

  const highlight = () => {
    requestAnimationFrame(() => {
      if (codeRef) {
        Prism.highlightElement(codeRef.querySelector("code") as HTMLElement);
      }
    });
  };

  onMount(highlight);
  onCleanup(() => {
    if (codeRef) codeRef.innerHTML = "";
  });

  return (
    <pre ref={codeRef} class="line-numbers" style={{ "white-space": 'pre' }}>
      <code class={`language-${lang}`} innerHTML={highlightedCode()
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')}></code>
    </pre>);
}


const goCode = `export function SuperTableTest() {
    return <SuperTable
  
      tableStyle={{
        "max-height": "300px",
        "overflow-y": "scroll",
        margin: "10px 0px",
      }}
  
      style={{
        margin: "10px",
        padding: "15px",
        width: "90%",
        "box-shadow": "rgba(0, 0, 0, 0.1) 0px 0px 6px 2px",
      }}
  
      tableArray={["#eedbf7", "#ffd5ca", "#d3fcdd",].map((tableHeaderColor) => {
        return {
          headerItems: [
            <><p>User Agent </p><IconTableHeading /></>,
            <><p>Started </p><IconTableHeading /></>,
            <><p>Active </p><IconTableHeading /></>,
            <><p>Valid </p><IconTableHeading /></>,
            <>Revoke</>,
          ],
          rowStyle: {
            "grid-template-columns": "1fr 2fr 1fr 1fr 1fr"
          },
          headerStyle: {
            "grid-template-columns": "1fr 2fr 1fr 1fr 1fr,
          },
          headerCellStyle: () => {
            return {
              margin: ".1rem",
              padding: "10px",
              background: tableHeaderColor,
            };
          },
          rowCellStyle: (row, col) => {
            return {
              padding: "10px",
              margin: ".1rem",
              background: (col == 1 || row == 1) ? tableHeaderColor : ""
            };
          },
          data: [
            { agent: "Hello", iat: 1744696177, exp: 1744696177 },
            { agent: "Hello", iat: 1744696177, exp: 1744696177 },
            { agent: "Hello", iat: 1744696177, exp: 1744696177 },
            { agent: "Hello", iat: 1744696177, exp: 1744696177 },
            { agent: "Hello", iat: 1744696177, exp: 1744696177 },
            { agent: "Hello", iat: 1744696177, exp: 1744696177 },
          ].map((s, _i) => {
            return {
              hiddenDetails: <div>More info about John Doe...</div>,
  
              rowItems: [
                <p>{s.agent}</p>,
  
                <p>{(() => {
                  let d = new Date(Number(s.iat) * 1000);
                  return d.toLocaleDateString() + " (" + d.toLocaleTimeString() + ")";
                })()}</p>,
                <p>Active</p>,
                <p>{s.exp.toString()}</p>,
                <button class={CssUI.IconButton}><IconCross /></button>
              ]
            };
          }
          )
        };
      })}
  
      headerstart={<div>
        <h3>Login sessions</h3>
      </div>}
      headerend={<div class="flex gap2">
        <button class={CssUI.OutlinedButton}>Revoke All</button>
        <button class={CssUI.MaterialButton}>Logout</button>
      </div>}
      footerstart={<p>Page 1 of 10</p>}
      footerend={<div class="flex gap2">
        <button class={CssUI.MaterialButton}>Previous</button>
        <button class={CssUI.MaterialButton}>Next</button>
      </div>}
    ></SuperTable>;
  }
  `;
