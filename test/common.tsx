import { For, JSX } from "solid-js";
import { AA, Header, IMG } from "../src/nav/header";
import { CssTEST } from "./gen";
import { RandomColor } from "../src/utils/color";
import { ThemeToggle } from "../src/gen";

export function TestHeader() {
    return <Header
        title={<a href="/">
            <IMG src="/logo.png" alt="solgaleo" />
            <p>Solgaleo</p>
        </a>}
        links={[
            <AA href={'/nav'} title='Nav'>Nav</AA>,
            <AA href={'/adv'} title='Adv' >Adv</AA>,
            <AA href={'/svg'} title='Svg' >Svg</AA>,
            <AA href={'/fancy'} title='Fancy' >Fancy</AA>,
            <AA href={'/ui'} title='Ui' >Ui</AA>,
            <AA href={'/grid'} title='Grid'>Grid</AA>,
            <AA href="/tabs" >Tab</AA>,
            <AA href="/tabs?two.light=settings.profile&two.night=home&one.night=settings.account.security&one.light=settings.account.notifications" >Tabs</AA>,
        ]}
        right={[
            <ThemeToggle />
        ]}
    />;
}

/*CSS:-

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
