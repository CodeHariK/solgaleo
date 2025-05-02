import { createSignal, For } from "solid-js";
import { CssNAV } from "./gen";
import { IconChevronLeft, IconChevronRight } from "../gen";

/*CSS:
.PaginationNav {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.PaginationList {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    padding: 0;
    margin: 0;
}

.PaginationButton {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    padding: 0 0.75rem;
    border: 1px solid var(--primary-container);
    background: var(--bg-color, white);
    color: var(--primary);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

// .PaginationButton:hover:not(:disabled):not(.PaginationActive) {
//     background: var(#ff00f6);
//     color: var(--hover-text, #374151);
//     border-color: var(--hover-border, #d1d5db);
// }

.PaginationActive {
    background: var(--primary);
    color: var(--primary-container);
    border-color: var(--primary);
}

.PaginationItem {
    transition: transform 0.2s ease-in-out;
}

.PaginationItem:hover {
    transform: translateY(-1px);
}
*/

type PaginationProps = {
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function Pagination({ totalPages, onPageChange }: PaginationProps) {

    const [currentPage, setCurrentPage] = createSignal(1);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav class={CssNAV.PaginationNav} aria-label="Pagination">
            <ul class={CssNAV.PaginationList}>

                <li>
                    <button
                        onClick={() => {
                            if (currentPage() > 1) {
                                console.log("<", totalPages, currentPage() - 1)
                                setCurrentPage(currentPage() - 1)
                                onPageChange(currentPage() - 1)
                            }
                        }}
                        disabled={currentPage() === 1}
                        class={CssNAV.PaginationButton}
                        aria-label="Previous page"
                    >
                        <IconChevronLeft />
                    </button>
                </li>

                <For each={pageNumbers}>
                    {(number) => (
                        <li class={CssNAV.PaginationItem}>
                            <button
                                onClick={() => {
                                    setCurrentPage(number)
                                    onPageChange(number)
                                }}
                                class={`${CssNAV.PaginationButton} ${currentPage() === number ? CssNAV.PaginationActive : ''
                                    }`}
                            >
                                {number}
                            </button>
                        </li>
                    )}
                </For>

                <li>
                    <button
                        onClick={() => {
                            if (currentPage() < totalPages) {
                                setCurrentPage(currentPage() + 1)

                                onPageChange(currentPage() + 1)
                            }
                        }}
                        disabled={currentPage() === totalPages}
                        class={CssNAV.PaginationButton}
                        aria-label="Next page"
                    >
                        <IconChevronRight />
                    </button>
                </li>
            </ul>
        </nav>
    );
}
