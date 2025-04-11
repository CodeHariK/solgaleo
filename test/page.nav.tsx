import { createMemo, createSignal, For } from "solid-js";
import { CssUI, IconHome, ThemeToggle } from "../src/gen";
import * as N from "../src/nav/gen";
import { Portal } from "solid-js/web";

export function NavTest() {

    const [toggle, setToggle] = createSignal(false);
    const [isModalOpen, setIsModalOpen] = createSignal(true);


    return <>
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
            iconSrc="https://cdn.pixabay.com/photo/2022/08/22/02/05/logo-7402513_640.png"
            title={<p>Solgaleo</p>}
            links={[
                <N.HeaderLinks href="/products" title="Products" />,
                <N.HeaderLinks href="/account" title="Accounts" />,
                <N.HeaderLinks href="/docs" title="Docs" />
            ]}
            rightChildren={<ThemeToggle />}
        />

        <N.TransitionWidget
            showFirstWidget={toggle()}
            one={
                <button class={CssUI.OutlinedButton} onclick={() => setToggle(prev => !prev)}>
                    One
                </button>
            }
            two={
                <button class={CssUI.MaterialButton} onclick={() => setToggle(prev => !prev)}>
                    Two
                </button>
            }
        />

        {/* <N.Modal child={">>> Show Modal <<<"} modal={() => "Hi"} /> */}

        <button
            class={CssUI.MaterialButton}
            onClick={() => setIsModalOpen(true)}
        >
            Open Modal
        </button>

        {DummyModal(isModalOpen, setIsModalOpen, '5%', 0, null)}
        {/* {DummyModal(isModalOpen, setIsModalOpen, '5%', null,)} */}
        {/* {DummyModal(isModalOpen, setIsModalOpen, '5%', 200,)} */}
        {/* {DummyModal(isModalOpen, setIsModalOpen, null, null,)} */}
        {/* {DummyModal(isModalOpen, setIsModalOpen, -300, -300,)} */}
        {/* {DummyModal(isModalOpen, setIsModalOpen, 10, 1000,)} */}
        {/* {DummyModal(isModalOpen, setIsModalOpen, 1000, 0,)} */}
        {/* {DummyModal(isModalOpen, setIsModalOpen, 1000, -100,)} */}
        {DummyModal(isModalOpen, setIsModalOpen, 10, 10, 'bottomright')}
        {/* {DummyModal(isModalOpen, setIsModalOpen, 100, 500)} */}

        {/* {DummyModalAnchor(isModalOpen, setIsModalOpen, 40, 40, 30, 'top')} */}
        {/* {DummyModalAnchor(isModalOpen, setIsModalOpen, 40, 850, 80, 'bottom')} */}

        <PaginationTest />

    </>
}

function DummyModal(isModalOpen, setIsModalOpen,
    left: number | string, top: number | string,
    corner: 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
    return <N.Modal
        isOpen={isModalOpen()}
        onClose={() => setIsModalOpen(false)}
        animation="slide"
        fixed={{
            x: left,
            y: top,
            corner: corner
        }}
    >
        <div>{left}, {top}</div>
    </N.Modal>;
}

function DummyModalAnchor(isModalOpen, setIsModalOpen, left, top, offset, align) {
    return <N.Modal
        isOpen={isModalOpen()}
        onClose={() => setIsModalOpen(false)}
        anchor={{
            align: align,
            offset: offset,
            element: (setRef) => {
                return <button
                    ref={setRef}
                    style={{
                        background: "red",
                        position: "fixed",
                        left: `${left}px`,
                        top: `${top}px`
                    }}
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
