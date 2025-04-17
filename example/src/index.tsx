/* @refresh reload */
import { render } from 'solid-js/web'

import "solgaleo/solgaleo.css"

import * as SOL from "solgaleo"
import * as UI from "solgaleo/ui"
import * as NAV from "solgaleo/nav"
import { Route, Router } from '@solidjs/router'
// import * as FANCY from "solgaleo/fancy"
// import * as ADV from "solgaleo/adv"
// import * as SVG from "solgaleo/svg"

UI.AddTheme({
    name: "custom",
    type: "light"
})

render(() => <Router base="/">
    <Route path="/" component={App} />
</Router>,
    document.body!)


export function App() {
    return (<>
        <UI.GridLayout
            header={
                <NAV.Header
                    title={<NAV.AA href="/" children={""} />}
                    right={<UI.ThemeToggle />}
                />
            }
        >
            <button class={UI.CssUI.OutlinedButton}>Outline Button</button>

            <SOL.Banner />

        </UI.GridLayout>

    </>)
}
