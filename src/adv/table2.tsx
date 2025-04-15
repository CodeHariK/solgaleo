
/*CSS:
.TableGridContainer {
    max-height: 300px;
    overflow-y: auto;
}

.TableHeaderContainer {
    display: grid;
    flex-direction: column;
    position: sticky;
    top: 0;
    z-index: 10;
}

.TableHeaderItem {
    display: flex;
    padding: 10px;
    align-items: center;
}

.TableRowDetails {
    overflow: hidden;
    transition: max-height .8s ease, opacity 0.3s ease;
    max-height: 0;
    opacity: 0;
}

.TableRowDetailsShow {
    padding: 1rem;
    max-height: 4rem;
    opacity: 1;
}

*/

import { createSignal, JSX, Show } from "solid-js";
import { For } from "solid-js";
import { CssADV } from "./gen";

type TableProps = {
    title: string;
    data: {
        info?: JSX.Element;
        hiddenDetails?: JSX.Element;
        rowItems?: JSX.Element[];
    }[];
    headerItems: JSX.Element[];
    rowStyle?: JSX.CSSProperties,
    headerStyle?: JSX.CSSProperties,
    headerCellStyle?: JSX.CSSProperties,
    cellStyle?: JSX.CSSProperties
};

export function AccordionGrid({ tableArray }: {
    tableArray: TableProps[],
}) {
    const [expandedRow, setExpandedRow] = createSignal<number | null>(null);

    return (
        <div class={CssADV.TableGridContainer}>
            <For each={tableArray}>
                {(table) => (
                    <>
                        <div class={CssADV.TableHeaderContainer}
                            style={{
                                "grid-template-columns": `repeat(${table.data[0]?.rowItems?.length ?? 1}, 1fr)`,
                                ...table.headerStyle
                            }}>
                            <h1 style={{ "grid-column": `span ${table.headerItems?.length ?? 1}` }}>{table.title}</h1>
                            <div style={{
                                display: "contents"
                            }}>
                                <For each={table.headerItems}>
                                    {(headerItem) => <div
                                        class={CssADV.TableHeaderItem}
                                        style={table.headerCellStyle}
                                    >{headerItem}</div>}
                                </For>
                            </div>
                        </div>

                        <Show when={table.data}>
                            <div style={{
                                display: "grid",
                                "grid-template-columns": `repeat(${table.data[0]?.rowItems?.length ?? 1}, 1fr)`,
                                ...table.rowStyle
                            }}>
                                <For each={table.data}>
                                    {(item, index) => (
                                        <>
                                            <div
                                                style={{
                                                    display: "contents"
                                                }}
                                                onMouseEnter={() => setExpandedRow(index())}
                                                onMouseLeave={() => setExpandedRow(null)}
                                            >
                                                <Show when={item.info}>
                                                    <div
                                                        style={{ "grid-column": `span ${item.rowItems?.length ?? 1}` }}
                                                    >
                                                        {item.info}
                                                    </div>
                                                </Show>
                                                <For each={item.rowItems}>
                                                    {(cell) => <div style={table.cellStyle}>{cell}</div>}
                                                </For>
                                                <Show when={item.hiddenDetails}>
                                                    <div class={CssADV.TableRowDetails}
                                                        style={{ "grid-column": `span ${item.rowItems?.length ?? 1}` }}
                                                        classList={{ [CssADV.TableRowDetailsShow]: expandedRow() === index() }}
                                                    >
                                                        {item.hiddenDetails}
                                                    </div>
                                                </Show>
                                            </div>
                                        </>
                                    )}
                                </For>
                            </div>
                        </Show>
                    </>
                )}
            </For>
        </div>
    );
}
