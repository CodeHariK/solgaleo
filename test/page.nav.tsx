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

        {/* {DummyModal(isModalOpen, setIsModalOpen, '5%', '35%', null)}
        {DummyModal(isModalOpen, setIsModalOpen, -100, 10, 'bottomleft')}
        {DummyModal(isModalOpen, setIsModalOpen, '5%', 0, 'topright')}
        {DummyModal(isModalOpen, setIsModalOpen, 50, '-20%', 'bottomright')} */}

        {/* {DummyModalAnchor(isModalOpen, setIsModalOpen, "100px", "20%", 10, 'left')}
        {DummyModalAnchor(isModalOpen, setIsModalOpen, "90%", "20%", 10, 'left')}
        {DummyModalAnchor(isModalOpen, setIsModalOpen, "300px", "40%", 10, 'left')} */}

        {/* {DummyModalAnchor(isModalOpen, setIsModalOpen, "20px", "60%", 10, 'right')} */}
        {/* {DummyModalAnchor(isModalOpen, setIsModalOpen, "90%", "60%", 10, 'right')} */}
        {/* {DummyModalAnchor(isModalOpen, setIsModalOpen, "300px", "80%", 10, 'right')} */}

        {/* {DummyModalAnchor(isModalOpen, setIsModalOpen, 40, "80%", 0, 'top')} */}
        {/* {DummyModalAnchor(isModalOpen, setIsModalOpen, "90%", "80%", 0, 'top')} */}
        {DummyModalAnchor(isModalOpen, setIsModalOpen, 40, "10%", 0, 'top')}
        {DummyModalAnchor(isModalOpen, setIsModalOpen, "90%", "10%", 0, 'top')}

        {/* {DummyModalAnchor(isModalOpen, setIsModalOpen, "50%", '850px', 0, 'bottom')} */}

        <PaginationTest />

    </>
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
                        left: left,
                        top: top
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
