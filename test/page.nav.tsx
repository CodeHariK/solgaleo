import { createSignal, JSX, Show, Signal } from "solid-js";
import { DragBox, GridLayout, IconHome, Input, VCarousel } from "../src/gen";
import * as N from "../src/nav/gen";
import { TestHeader } from "./common";

export function NavTest() {

    const [experiment, setExperiment] = createSignal(0);
    const modalVisibility = createSignal(false);

    return <GridLayout
        header={<TestHeader />}
        left={<VCarousel

            itemStyle={{
                background: "var(--primary-bg)",
                "border-radius": "1rem",
                "text-align": 'center',
                "align-content": 'center'
            }}
            listStyle={{ padding: "10px" }}

            children={[
                <p style={{ padding: "40px", }} onclick={() => { setExperiment(0), modalVisibility[1](true); }}>Modal</p>,
                <p style={{ padding: "40px", }} onclick={() => { setExperiment(1), modalVisibility[1](true); }}>ModalScroll</p>,
                <p style={{ padding: "40px", }} onclick={() => { setExperiment(2), modalVisibility[1](true); }}>ModalAnchorLeft</p>,
                <p style={{ padding: "40px", }} onclick={() => { setExperiment(3), modalVisibility[1](true); }}>ModalAnchorRight</p>,
                <p style={{ padding: "40px", }} onclick={() => { setExperiment(4), modalVisibility[1](true); }}>ModalAnchorTop</p>,
                <p style={{ padding: "40px", }} onclick={() => { setExperiment(5), modalVisibility[1](true); }}>ModalAnchorBottom</p>,
                <p style={{ padding: "40px", }} onclick={() => { setExperiment(6), modalVisibility[1](true); }}>ModalAnchorDrag</p>,
                <p style={{ padding: "40px", }} onclick={() => { setExperiment(7), modalVisibility[1](true); }}>ModalInput</p>,
            ]} />}
    >
        <BreadcrumbTest />

        <Show when={experiment() == 0}>
            {DummyModal(modalVisibility, '5%', '35%', null)}
            {DummyModal(modalVisibility, -100, 10, 'bottomleft')}
            {DummyModal(modalVisibility, '5%', 0, 'topright')}
            {DummyModal(modalVisibility, 50, '-20%', 'bottomright')}
        </Show>

        <Show when={experiment() == 1}>
            <div class="flex justify-center space-around items-center" style={{ padding: "200px 120px", margin: "20px", background: "#ff222222" }}>
                {DummyModalAnchor(false, modalVisibility, "20px", "50%", 10, 'left')}
                {DummyModalAnchor(false, modalVisibility, "20px", "50%", 10, 'top')}
                {DummyModalAnchor(false, modalVisibility, "20px", "50%", 10, 'bottom')}
                {DummyModalAnchor(false, modalVisibility, "20px", "50%", 10, 'right')}
            </div>
        </Show>

        <Show when={experiment() == 2}>
            {DummyModalAnchor(true, modalVisibility, "20px", "50%", 10, 'left')}
            {DummyModalAnchor(true, modalVisibility, "90%", "50%", 10, 'left')}
            {DummyModalAnchor(true, modalVisibility, "30%", "70%", 10, 'left')}
            {DummyModalAnchor(true, modalVisibility, "70%", "98%", 10, 'left')}
            {DummyModalAnchor(true, modalVisibility, "0%", "98%", 10, 'left')}
            {DummyModalAnchor(true, modalVisibility, "0%", "0%", 10, 'left')}
            {DummyModalAnchor(true, modalVisibility, "90%", "0%", 10, 'left')}
        </Show>

        <Show when={experiment() == 3}>
            {DummyModalAnchor(true, modalVisibility, "20px", "50%", 10, 'right')}
            {DummyModalAnchor(true, modalVisibility, "90%", "50%", 10, 'right')}
            {DummyModalAnchor(true, modalVisibility, "30%", "70%", 10, 'right')}
            {DummyModalAnchor(true, modalVisibility, "70%", "98%", 10, 'right')}
            {DummyModalAnchor(true, modalVisibility, "0%", "98%", 10, 'right')}
            {DummyModalAnchor(true, modalVisibility, "0%", "0%", 10, 'right')}
            {DummyModalAnchor(true, modalVisibility, "90%", "0%", 10, 'right')}
        </Show>

        <Show when={experiment() == 4}>
            {DummyModalAnchor(true, modalVisibility, "20px", "50%", 10, 'top')}
            {DummyModalAnchor(true, modalVisibility, "90%", "50%", 10, 'top')}
            {DummyModalAnchor(true, modalVisibility, "30%", "70%", 10, 'top')}
            {DummyModalAnchor(true, modalVisibility, "70%", "98%", 10, 'top')}
            {DummyModalAnchor(true, modalVisibility, "0%", "98%", 10, 'top')}
            {DummyModalAnchor(true, modalVisibility, "0%", "0%", 10, 'top')}
            {DummyModalAnchor(true, modalVisibility, "90%", "0%", 10, 'top')}
        </Show>

        <Show when={experiment() == 5}>
            {DummyModalAnchor(true, modalVisibility, "20px", "50%", 10, 'bottom')}
            {DummyModalAnchor(true, modalVisibility, "95%", "50%", 10, 'bottom')}
            {DummyModalAnchor(true, modalVisibility, "30%", "70%", 10, 'bottom')}
            {DummyModalAnchor(true, modalVisibility, "70%", "98%", 10, 'bottom')}
            {DummyModalAnchor(true, modalVisibility, "0%", "98%", 10, 'bottom')}
            {DummyModalAnchor(true, modalVisibility, "0%", "0%", 10, 'bottom')}
            {DummyModalAnchor(true, modalVisibility, "90%", "0%", 10, 'bottom')}
        </Show>

        <Show when={experiment() == 6}>
            <N.Modal
                visibilitySignal={modalVisibility}
                anchor={{
                    align: "right",
                    offset: 10,
                    element: ([ref, setRef]) => {
                        return <DragBox anchorRef={ref} setAnchorRef={setRef} />;
                    }
                }}
                child={() => <TestDialog info="" modalVisibilty={modalVisibility} />}
            />
        </Show>
        <Show when={experiment() == 7}>
            <N.Modal
                title="Hello"
                visibilitySignal={modalVisibility}
                anchor={{
                    align: 'bottom',
                    offset: 10,
                    element: ([_, setRef], [, setVisibility]) => {
                        return <div class="px16">
                            <Input
                                ref={setRef}
                                style={{ width: "300px" }}
                                name="Search"
                                type="search"
                                onFocus={() => { setVisibility(true) }}
                            />
                        </div>
                    }
                }}
                child={(anchorRef) => <TestDialog anchorRef={anchorRef} info={`Hello`} modalVisibilty={modalVisibility} />}
            />
        </Show>

    </GridLayout>
}

//FN:START
//Breadcrumb
//FN:DOC
export function BreadcrumbTest() {
    return <N.Breadcrumbs items={[
        {
            element: <IconHome />,
            link: "/",
            fn: () => console.log("Hello")
        },
        {
            element: <span>Products</span>,
            link: "/products"
        },
        {
            element: <span>Category</span>
        }
    ]} />;
}
//FN:END

function TestDialog({ anchorRef, info, modalVisibilty }: {
    anchorRef?: HTMLButtonElement,
    info: JSX.Element,
    modalVisibilty: Signal<boolean>
}) {
    return <div class="flex flex-col p4"
        style={{ width: `${anchorRef?.getBoundingClientRect().width}px` }}>
        <p>how are you?</p>
        <div class="flex mt4 gap4">
            <button>ok</button>
            <button onclick={() => { modalVisibilty[1](false) }}>close</button>
        </div>
        <p class="p2 border-basic">{info}</p>
    </div>
}

function DummyModal(modalVisibility: Signal<boolean>,
    x: number | string, y: number | string,
    corner: 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {

    return <N.Modal
        title="Hello"
        visibilitySignal={modalVisibility}
        fixed={{
            x: x,
            y: y,
            corner: corner
        }}
        child={() => <TestDialog info={`${x} ${y} ${corner}`} modalVisibilty={modalVisibility} />}
    />;
}

function DummyModalAnchor(fixed: boolean, modalVisibility: Signal<boolean>, left, top, offset, align) {
    return <N.Modal
        title="Hello"
        visibilitySignal={modalVisibility}
        anchor={{
            align: align,
            offset: offset,
            element: ([, setRef], [, setVisibility]) => {
                return <button
                    ref={setRef}
                    // onmousemove={() => { setVisibility(true) }}
                    onclick={() => { setVisibility(true) }}
                    style={fixed ? {
                        position: "fixed",
                        left: left,
                        top: top
                    } : {}}
                >
                    Click me
                </button>;
            }
        }}
        child={() => <TestDialog info={`${left} ${top} ${align}`} modalVisibilty={modalVisibility} />}
    />
}
