import { For, JSX } from "solid-js";
import { AA, Header } from "../src/nav/header";
import { CssTEST } from "./gen";
import { RandomColor } from "../src/utils/color";
import { ThemeToggle } from "../src/gen";

const baseroute = "/solgaleo"

export function TestHeader() {
    return <Header
        title={<a href="/">
            <img src={baseroute + "/logo.png"} alt="solgaleo" />
            <p>Solgaleo</p>
        </a>}
        links={[
            <a href={baseroute + '/nav'} title='Nav'>Nav</a>,
            <a href={baseroute + '/adv'} title='Adv' >Adv</a>,
            <a href={baseroute + '/svg'} title='Svg' >Svg</a>,
            <a href={baseroute + '/fancy'} title='Fancy' >Fancy</a>,
            <a href={baseroute + '/ui'} title='Ui' >Ui</a>,
            <a href={baseroute + '/grid'} title='Grid'>Grid</a>,
            <AA href="/tabs" >TabsL</AA>,
            <AA href="/tabs?two.light=settings.profile&two.night=home&one.night=settings.account.security&one.light=settings.account.notifications" >TabL2</AA>,
        ]}
        right={[
            <ThemeToggle />
        ]}
    />;
}

/*CSS:

.ListContainer {
    padding: 1rem;
}

.List {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.ListItem {
    min-height: 200px;
    border-radius: 0.5rem;
    padding: 1.5rem;
    color: white;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition: transform 0.2s ease-in-out;
}

.ListItem:hover {
    transform: translateY(-2px);
}
*/

export function List({ children }: { children: (string | JSX.Element)[] }) {
    return (
        <div class={CssTEST.ListContainer}>
            <ul class={CssTEST.List}>

                <For each={children}>
                    {(child) => (
                        <li class={`${CssTEST.ListItem}`} style={{ background: RandomColor() }}>
                            {child}
                        </li>
                    )}
                </For>

            </ul>
        </div>
    );
}
