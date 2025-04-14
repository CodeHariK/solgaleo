/* @refresh reload */
import { render } from 'solid-js/web'

import "solgaleo/solgaleo.css"

import * as SOL from "solgaleo"
import * as UI from "solgaleo/ui"
import * as NAV from "solgaleo/nav"
// import * as FANCY from "solgaleo/fancy"
// import * as ADV from "solgaleo/adv"
// import * as SVG from "solgaleo/svg"

UI.AddTheme("custom")

render(() => <App />,
    document.body!)

export function App() {
    return (<>
        <UI.GridLayout
            header={
                <NAV.Header
                    title={"Solgaleo"}
                    right={<UI.ThemeToggle />}
                />
            }
        >
            <button class={UI.CssUI.OutlinedButton}>Outline Button</button>

            <SOL.Banner />

        </UI.GridLayout>

    </>)
}
