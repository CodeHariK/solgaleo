import { createSignal } from "solid-js";
import { VCarousel } from "../src/adv/gen";
import { Accordion, GridLayout, useSolContext } from "../src/ui/gen";
import { RandomColor } from "../src/utils/color";
import { TestHeader } from "./common";
import { CssTEST } from "./gen";

/*CSS:-
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