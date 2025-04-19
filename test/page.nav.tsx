import { createMemo, createSignal, For, JSX, Show } from "solid-js";
import { DragBox, GridLayout, IconHome } from "../src/gen";
import * as N from "../src/nav/gen";
import { List, TestHeader } from "./common";

export function NavTest() {

    const [experiment, setExperiment] = createSignal(0);
    const [isModalOpen, setIsModalOpen] = createSignal(true);

    return <GridLayout
        header={<TestHeader />}
        left={<List children={[
            <p onclick={() => { setExperiment(0), setIsModalOpen(true); }}>Modal</p>,
            <p onclick={() => { setExperiment(1), setIsModalOpen(true); }}>ModalScroll</p>,
            <p onclick={() => { setExperiment(2), setIsModalOpen(true); }}>ModalAnchorLeft</p>,
            <p onclick={() => { setExperiment(3), setIsModalOpen(true); }}>ModalAnchorRight</p>,
            <p onclick={() => { setExperiment(4), setIsModalOpen(true); }}>ModalAnchorTop</p>,
            <p onclick={() => { setExperiment(5), setIsModalOpen(true); }}>ModalAnchorBottom</p>,
            <p onclick={() => { setExperiment(6), setIsModalOpen(true); }}>ModalAnchorDrag</p>,
        ]} />}
    >
        <N.Breadcrumbs items={[
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
        ]} />

        <PaginationTest />

        <Show when={experiment() == 0}>
            {DummyModal(isModalOpen, setIsModalOpen, '5%', '35%', null)}
            {DummyModal(isModalOpen, setIsModalOpen, -100, 10, 'bottomleft')}
            {DummyModal(isModalOpen, setIsModalOpen, '5%', 0, 'topright')}
            {DummyModal(isModalOpen, setIsModalOpen, 50, '-20%', 'bottomright')}
        </Show>

        <Show when={experiment() == 1}>
            <div class="flex justify-center space-around items-center" style={{ padding: "200px 120px", margin: "20px", background: "#ff222222" }}>
                {DummyModalAnchor(false, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'left')}
                {DummyModalAnchor(false, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'top')}
                {DummyModalAnchor(false, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'bottom')}
                {DummyModalAnchor(false, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'right')}
            </div>
        </Show>

        <Show when={experiment() == 2}>
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'left')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "50%", 10, 'left')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "30%", "70%", 10, 'left')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "70%", "98%", 10, 'left')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "98%", 10, 'left')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "0%", 10, 'left')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "0%", 10, 'left')}

        </Show>

        <Show when={experiment() == 3}>
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'right')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "50%", 10, 'right')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "30%", "70%", 10, 'right')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "70%", "98%", 10, 'right')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "98%", 10, 'right')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "0%", 10, 'right')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "0%", 10, 'right')}
        </Show>

        <Show when={experiment() == 4}>
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'top')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "50%", 10, 'top')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "30%", "70%", 10, 'top')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "70%", "98%", 10, 'top')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "98%", 10, 'top')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "0%", 10, 'top')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "0%", 10, 'top')}
        </Show>

        <Show when={experiment() == 5}>
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'bottom')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "95%", "50%", 10, 'bottom')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "30%", "70%", 10, 'bottom')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "70%", "98%", 10, 'bottom')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "98%", 10, 'bottom')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "0%", 10, 'bottom')}
            {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "0%", 10, 'bottom')}
        </Show>

        <Show when={experiment() == 6}>
            <N.Modal
                isOpen={isModalOpen()}
                onClose={() => setIsModalOpen(false)}
                anchor={{
                    align: "right",
                    offset: 10,
                    element: (ref, setRef) => {
                        return <DragBox anchorRef={ref} setAnchorRef={setRef} />;
                    }
                }}
            >
                <TestDialog info="" />
            </N.Modal>
        </Show>

    </GridLayout>
}

function TestDialog({ info }: { info: JSX.Element }) {
    return <div class="flex flex-col">
        <p>how are you?</p>
        <div class="flex mt4 gap4">
            <button>ok</button>
            <button>close</button>
        </div>
        <p class="p2 border-basic">{info}</p>
    </div>

}

function DummyModal(isModalOpen, setIsModalOpen,
    x: number | string, y: number | string,
    corner: 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {

    return <N.Modal
        title="Hello"
        isOpen={isModalOpen()}
        onClose={() => {
            setIsModalOpen(false)
        }}
        fixed={{
            x: x,
            y: y,
            corner: corner
        }}
    >
        <TestDialog info={`${x} ${y} ${corner}`} />
    </N.Modal >;
}

function DummyModalAnchor(fixed: boolean, isModalOpen, setIsModalOpen, left, top, offset, align) {
    return <N.Modal
        title="Hello"
        isOpen={isModalOpen()}
        onClose={() => setIsModalOpen(false)}
        anchor={{
            align: align,
            offset: offset,
            element: (_, setRef) => {
                return <button
                    ref={setRef}
                    onclick={setIsModalOpen(true)}
                    style={fixed ? {
                        background: "red",
                        position: "fixed",
                        left: left,
                        top: top
                    } : { background: "green", }}
                >
                    Click me
                </button>;
            }
        }}
    >
        <TestDialog info={`${left} ${top} ${align}`} />
    </N.Modal>;
}

function PaginationTest() {
    const [currentPage, setCurrentPage] = createSignal(1);

    const itemsPerPage = 3;
    const items = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

    const currentItems = createMemo(() => {
        const start = (currentPage() - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return items.slice(start, end);
    });

    return (
        <div>
            <For each={currentItems()}>
                {(item) => <div>{item}</div>}
            </For>

            <N.Pagination
                totalPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(page) => { setCurrentPage(page) }}
            />
        </div>
    );
}
