import { Show, JSX } from "solid-js";
import { Transition } from "solid-transition-group";
import { CssFANCY } from "./gen";

/* CSS:
.TransitionContainer {
    position: relative;
    min-height: 100px;
}

.TransitionItem {
    position: absolute;
    width: 100%;
}

.TransitionEnter {
    opacity: 0;
    transform: translateY(20px);
}

.TransitionEnterActive {
    opacity: 1;
    transform: translateY(0);
    transition: all 300ms ease-out;
}

.TransitionExit {
    opacity: 1;
    transform: translateY(0);
}

.TransitionExitActive {
    opacity: 0;
    transform: translateY(-20px);
    transition: all 300ms ease-in;
}
*/

export function TransitionWidget(props: {
    showFirstWidget: boolean,
    one: JSX.Element,
    two: JSX.Element
}) {
    return (
        <div class={CssFANCY.TransitionContainer}>
            <Transition
                enterClass={CssFANCY.TransitionEnter}
                enterActiveClass={CssFANCY.TransitionEnterActive}
                exitClass={CssFANCY.TransitionExit}
                exitActiveClass={CssFANCY.TransitionExitActive}
            >
                <Show when={props.showFirstWidget}>
                    <div class={CssFANCY.TransitionItem}>
                        {props.one}
                    </div>
                </Show>
            </Transition>

            <Transition
                enterClass={CssFANCY.TransitionEnter}
                enterActiveClass={CssFANCY.TransitionEnterActive}
                exitClass={CssFANCY.TransitionExit}
                exitActiveClass={CssFANCY.TransitionExitActive}
            >
                <Show when={!props.showFirstWidget}>
                    <div class={CssFANCY.TransitionItem}>
                        {props.two}
                    </div>
                </Show>
            </Transition>
        </div>
    );
};
