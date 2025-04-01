/* @refresh reload */
import { render } from 'solid-js/web'
import { Storybook } from './storybook.tsx'

import "./index.css"

import * as Solgaleo from "solgaleo";

Solgaleo.AddTheme("custom")

render(() => <Storybook />, document.body!)
