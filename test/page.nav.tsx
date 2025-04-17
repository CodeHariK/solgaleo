import { createMemo, createSignal, For } from "solid-js";
import { CssUI, DragBox, GridLayout, IconHome, ThemeToggle } from "../src/gen";
import * as N from "../src/nav/gen";
import { TestHeader } from "./common";

export function NavTest() {

    const [isModalOpen, setIsModalOpen] = createSignal(true);

    return <GridLayout
        header={<TestHeader />}
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

        <N.Header
            title={<p><img src="https://cdn.pixabay.com/photo/2022/08/22/02/05/logo-7402513_640.png" />Solgaleo</p>}
            links={[
                <a href="/products" title="Products" />,
                <a href="/account" title="Accounts" />,
                <a href="/docs" title="Docs" />
            ]}
            right={<ThemeToggle />}
        />

        {/* <N.Modal child={">>> Show Modal <<<"} modal={() => "Hi"} /> */}

        <button
            class={CssUI.MaterialButton}
            onClick={() => setIsModalOpen(true)}
        >
            Open Modal
        </button>


        <N.Modal
            isOpen={isModalOpen()}
            onClose={() => setIsModalOpen(false)}
            anchor={{
                align: "bottom",
                offset: 10,
                element: (ref, setRef) => {
                    return <DragBox anchorRef={ref} setAnchorRef={setRef} />;
                }
            }}
        >
            <div>button</div>
        </N.Modal>


        {/* {DummyModal(isModalOpen, setIsModalOpen, '5%', '35%', null)}
        {DummyModal(isModalOpen, setIsModalOpen, -100, 10, 'bottomleft')}
        {DummyModal(isModalOpen, setIsModalOpen, '5%', 0, 'topright')}
        {DummyModal(isModalOpen, setIsModalOpen, 50, '-20%', 'bottomright')} */}

        {/* {DummyModalAnchor(false, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'left')}
        {DummyModalAnchor(false, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'right')}
        {DummyModalAnchor(false, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'top')}
        {DummyModalAnchor(false, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'bottom')} */}

        {/* {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'left')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "50%", 10, 'left')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "30%", "70%", 10, 'left')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "70%", "98%", 10, 'left')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "98%", 10, 'left')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "0%", 10, 'left')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "0%", 10, 'left')}

        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'right')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "50%", 10, 'right')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "30%", "70%", 10, 'right')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "70%", "98%", 10, 'right')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "98%", 10, 'right')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "0%", 10, 'right')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "0%", 10, 'right')}

        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'top')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "50%", 10, 'top')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "30%", "70%", 10, 'top')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "70%", "98%", 10, 'top')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "98%", 10, 'top')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "0%", 10, 'top')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "0%", 10, 'top')}

        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "20px", "50%", 10, 'bottom')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "50%", 10, 'bottom')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "30%", "70%", 10, 'bottom')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "70%", "98%", 10, 'bottom')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "98%", 10, 'bottom')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "0%", "0%", 10, 'bottom')}
        {DummyModalAnchor(true, isModalOpen, setIsModalOpen, "90%", "0%", 10, 'bottom')} */}

        <PaginationTest />

    </GridLayout>
}

function DummyModal(isModalOpen, setIsModalOpen,
    x: number | string, y: number | string,
    corner: 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
    return <N.Modal
        isOpen={isModalOpen()}
        onClose={() => setIsModalOpen(false)}
        animation="slide"
        fixed={{
            x: x,
            y: y,
            corner: corner
        }}
    >
        <div>{x}, {y}, {corner}</div>
    </N.Modal>;
}

function DummyModalAnchor(fixed: boolean, isModalOpen, setIsModalOpen, left, top, offset, align) {
    return <N.Modal
        isOpen={isModalOpen()}
        onClose={() => setIsModalOpen(false)}
        anchor={{
            align: align,
            offset: offset,
            element: (setRef) => {
                return <button
                    ref={setRef}
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
        <div>Anc{left}, {top}, {align}</div>
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
