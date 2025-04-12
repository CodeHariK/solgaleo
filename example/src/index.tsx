/* @refresh reload */
import { render } from 'solid-js/web'

import "solgaleo/solgaleo.css"

import * as S from "solgaleo/ui"

render(() => <App />,
    document.body!)

export function App() {
    return (<>
        <S.GridLayout />
    </>)
}
