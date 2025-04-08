/* @refresh reload */
import { render } from 'solid-js/web'

import "solgaleo/solgaleo.css"
import { Banner } from "solgaleo/fancy"

render(() => <App />,
    document.body!)

export function App() {
    return (<>
        <Banner />
    </>)
}
