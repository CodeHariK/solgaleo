import { VCarousel } from "../src/adv/gen";
import { GridLayout, useSolContext } from "../src/ui/gen";
import { RandomColor } from "../src/utils/color";
import { TestHeader } from "./common";
import { CssTEST } from "./gen";

/*CSS:-
.CodeCard {
    width: 100%;
    min-height: 200px;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition: transform 0.2s ease-in-out;

    :hover {
        transform: translateY(-2px);
    }
}
*/

let code = ["one", "two", "three", "four", "five"]

export function RootPage() {

    const { data } = useSolContext()

    const light = () => data.themes[data.themeIndex]?.name == "light"

    return <GridLayout

        header={<TestHeader />}

        left={<VCarousel
            children={code.map((c) => {
                return <div class={CssTEST.CodeCard} style={{
                    background: RandomColor({ lightness: light() ? 80 : 30 }),
                    color: light() ? "black" : "white",
                }}>
                    <pre>
                        {c}
                    </pre>
                </div>
            })}
            listStyle={{ padding: "1rem" }}
            itemStyle={{}}
        />}

        gridStyle={{
            "grid-template-columns": "minmax(200px, 45%) 1fr"
        }}

    >
        Root {data?.themeIndex}
    </GridLayout>
}