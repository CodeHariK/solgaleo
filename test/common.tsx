import { For, JSX } from "solid-js";
import { Header, HeaderLink } from "../src/nav/header";
import { CssTEST } from "./gen";
import { RandomColor } from "../src/utils/color";
import { ThemeToggle } from "../src/gen";

export function TestHeader() {
    return <Header
        title={"Solgaleo"}
        links={[
            <HeaderLink href='/nav' title='Nav' />,
            <HeaderLink href='/adv' title='Adv' />,
            <HeaderLink href='/svg' title='Svg' />,
            <HeaderLink href='/fancy' title='Fancy' />,
            <HeaderLink href='/ui' title='Ui' />,
            <HeaderLink href='/grid' title='Grid' />,
            <HeaderLink href='/tabs?two.light=home&two.night=settings.account.security&one.night=settings.account.notifications&one.light=settings.profile' title='Tabs' />,
        ]}
        rightChildren={[
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
