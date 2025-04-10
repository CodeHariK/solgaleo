import { createMemo, createSignal, For } from "solid-js";
import { CssUI, IconHome, ThemeToggle } from "../src/gen";
import * as N from "../src/nav/gen";

export function NavTest() {

    const [toggle, setToggle] = createSignal(false);


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

        <PaginationTest />

    </>
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
