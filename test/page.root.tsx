import { createSignal } from "solid-js";
import { VCarousel } from "../src/adv/gen";
import { Accordion, GridLayout, useSolContext } from "../src/ui/gen";
import { RandomColor } from "../src/utils/color";
import { TestHeader } from "./common";
import { CssTEST } from "./gen";

/*CSS:-
.CodeCard {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition: transform 0.2s ease-in-out;

    :hover {
        transform: translateY(-2px);
    }
}
*/

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
                        // background: RandomColor({ lightness: light() ? 96 : 30 }),
                        // color: light() ? "black" : "white",
                    }}
                    onClick={() => {
                        console.log(i)
                        setCodeIndex(i)
                    }}
                >
                    <Accordion
                        title={c.doc}
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