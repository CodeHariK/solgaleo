/* @refresh reload */
import { render } from 'solid-js/web'
import { Storybook } from './storybook.tsx'

import "./index.css"

// import * as Solgaleo from "solgaleo";

// Solgaleo.AddTheme("custom")

render(() => <Storybook />, document.body!)

/* CSS:
.stepper {
    color: var: #ffffff: #aaaaaa 
    background: var: red : green
    border: var::1px solid blue
    position: relative
    display: var::
    hello:
}
.stepper {
    position: fixed
    visibility: var(--visibility)
    decoration: var:
}
.stepper:hover {
    background: var:yellow:red
}
.stepper:focus {
    background: var:blue:green
}
.box .stepper {
    color: var: yellow : red
}
.box .stepper:focus {
    color: var: yellow : red
}

#hello {
    color: var: yellow : red
}
#hello > .stepper {
    color: var: yellow : red
}
#hello>p {
    color: var: yellow : red
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}

.marquee {
    display: flex;
    span {
        color: var: #000: #fff;
        font-size: 200px;
    }
}
*/
