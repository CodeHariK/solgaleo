import { type JSX } from 'solid-js';

export type TableProps = {
    heading: JSX.Element[];
    rows: JSX.Element[][];
    class?: string[];
}

export function Table(props: TableProps) {
    return <>
        <table class="w-full mt-2 text-left table-auto min-w-max over">
            <thead>
                <tr>
                    {props.heading.map((e) => (
                        <th
                            class="p-4 cursor-pointer border-y border-slate-200 night:border-slate-600 bg-slate-50 night:bg-slate-700 hover:bg-slate-100 night:hover:bg-slate-600">
                            <p
                                class="flex items-center justify-between font-sans text-sm  font-normal leading-none text-slate-500 night:text-slate-100"
                            >
                                {e}
                            </p>
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {props.rows.map((row) => (
                    <tr>
                        {row.map((item, i) => (
                            <td class={`p-4 border-b border-slate-200 night:border-slate-600 ${(props.class ?? [])[i]}`}>
                                {item}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>;
}

export type SuperTableProps = {
    table: TableProps;
    headerstart?: JSX.Element;
    headerend?: JSX.Element;
    footerstart?: JSX.Element;
    footerend?: JSX.Element;
    class?: string;
    width?: number | string;
};

export function SuperTable(props: SuperTableProps) {
    return (
        <div
            class={`${props.class || ''} mx-auto`}
            style={{ width: typeof props.width === "number" ? `${props.width}px` : props.width }}  // ✅ Convert number to string
        >
            <div class="flex flex-col w-full h-full bg-white night:bg-gray-800 shadow-md rounded-xl bg-clip-border">
                {!(props.headerstart || props.headerend) ? null : (
                    <div class="flex items-center justify-between mx-4 mt-4 overflow-hidden rounded-none bg-clip-border">
                        {props.headerstart}
                        {props.headerend}
                    </div>
                )}

                <Table heading={props.table.heading} rows={props.table.rows} class={props.table.class} />

                {!(props.footerstart || props.footerend) ? null : (
                    <div class="flex items-center justify-between p-3">
                        {props.footerstart}
                        {props.footerend}
                    </div>
                )}
            </div>
        </div>
    );
}
