/* @refresh reload */
import { render } from 'solid-js/web'

import "solgaleo/solgaleo.css"
import * as S from "solgaleo/ui"

render(() => <App />,
    document.body!)

export function App() {
    return (<>
        {/* <GridLayout /> */}
        <S.MaterialButton />
        <S.OutlinedButton />
        <S.CheckboxGroup id="Hello" checkboxes={[]} />
        <S.GridLayout />
        <S.SpaceLayout title='Hello' />
    </>)
}
