import { CssADV } from './gen';
import { createSignal, type JSX, Show } from "solid-js";
import { For } from "solid-js";
import { debounce } from '../utils/debounce';

/*CSS:

.SuperTable {
    display: flex; 
    flex-direction: column; 
    border-radius: 0.75rem; 
    background-clip: border-box; 
}

.TableHeader {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    background-clip: border - box;
}

.TableFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.TableHeaderContainer {
    display: grid;
    position: sticky;
    top: 0;
    z-index: 10;
}

.CellItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    // min-width: 0;
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

type TableRowProps = {
    title?: string;
    data: {
        info?: JSX.Element;
        hiddenDetails?: JSX.Element;
        rowItems?: JSX.Element[];
    }[];
    headerItems: JSX.Element[];
    headerStyle?: JSX.CSSProperties,
    headerCellStyle?: (colIndex: number, tableIndex: number) => JSX.CSSProperties,
    rowStyle?: JSX.CSSProperties,
    rowCellStyle?: (rowIndex: number, colIndex: number, tableIndex: number) => JSX.CSSProperties
};

export function Table(props: {
    tableArray: TableRowProps[];
    headerstart?: JSX.Element;
    headerend?: JSX.Element;
    footerstart?: JSX.Element;
    footerend?: JSX.Element;
    style?: JSX.CSSProperties;
    tableStyle?: JSX.CSSProperties;
}) {

    const [expandedRow, setExpandedRow] = createSignal<number | null>(null);

    const debouncedSetExpandedRow = debounce((rowIndex: number | null) => {
        setExpandedRow(rowIndex);
    }, 100);

    return (
        <div class={CssADV.SuperTable} style={props.style}>
            {!(props.headerstart || props.headerend) ? null : (
                <div class={CssADV.TableHeader}>
                    {props.headerstart}
                    {props.headerend}
                </div>
            )}

            <div style={props.tableStyle}>
                <For each={props.tableArray}>
                    {(table, tableIndex) => (
                        <>
                            <div
                                class={CssADV.TableHeaderContainer}
                                style={{
                                    "grid-template-columns": `repeat(${table.data[0]?.rowItems?.length ?? 1}, 1fr)`,
                                    ...table.headerStyle
                                }}
                            >

                                {table.title && <h1 style={{ "grid-column": `span ${table.headerItems?.length ?? 1}` }}>{table.title}</h1>}

                                <div style={{ display: "contents" }}>
                                    <For each={table.headerItems}>
                                        {(headerItem, headerCol) => <div
                                            class={CssADV.CellItem}
                                            style={table.headerCellStyle(headerCol(), tableIndex())}
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
                                        {(item, rowIndex) => (
                                            <div
                                                style={{
                                                    display: "contents"
                                                }}
                                                onMouseEnter={() => debouncedSetExpandedRow(rowIndex())}
                                                onMouseLeave={() => debouncedSetExpandedRow(null)}
                                            >
                                                <Show when={item.info}>
                                                    <div
                                                        style={{ "grid-column": `span ${item.rowItems?.length ?? 1}` }}
                                                    >
                                                        {item.info}
                                                    </div>
                                                </Show>
                                                <For each={item.rowItems}>
                                                    {(cell, colIndex) => {
                                                        return <div
                                                            class={CssADV.CellItem}
                                                            style={table.rowCellStyle?.(rowIndex(), colIndex(), tableIndex())}
                                                        >
                                                            {cell}
                                                        </div>;
                                                    }}
                                                </For>
                                                <Show when={item.hiddenDetails}>
                                                    <div class={CssADV.TableRowDetails}
                                                        style={{ "grid-column": `span ${item.rowItems?.length ?? 1}` }}
                                                        classList={{ [CssADV.TableRowDetailsShow]: expandedRow() === rowIndex() }}
                                                    >
                                                        {item.hiddenDetails}
                                                    </div>
                                                </Show>
                                            </div>
                                        )}
                                    </For>
                                </div>
                            </Show>
                        </>
                    )}
                </For>
            </div>

            {!(props.footerstart || props.footerend) ? null : (
                <div class={CssADV.TableFooter}>
                    {props.footerstart}
                    {props.footerend}
                </div>
            )}
        </div>
    );
}

