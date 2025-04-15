import { type JSX } from 'solid-js';
import { CssADV } from './gen';

/*CSS:

.SuperTable {
    // width: max-content;
    display: flex; 
    flex-direction: column; 
    border-radius: 0.75rem; 
    background-clip: border-box; 

    table {
        margin-top: 0.5rem; 
        text-align: left; 
        table-layout: auto; 
    }

    tr {
    }
        
    th {
        white-space: nowrap; 
        padding: .4rem;
        border: 1px solid blue;
        text-wrap-style: balance;

        * {
            display: inline;
            vertical-align: middle;
        }
    }
    td {
        padding: .2rem;
        border: 1px solid red;
    }
}

.TableHeader {
    display: flex;
    overflow: hidden;
    margin - left: 1rem;
    margin - right: 1rem;
    margin - top: 1rem;
    justify - content: space - between;
    align - items: center;
    border - radius: 0;
    background - clip: border - box;
}

.TableFooter {
    display: flex;
    padding: 0.75rem;
    justify - content: space - between;
    align - items: center;
}

*/

export type TableProps = {
    heading: JSX.Element[];
    rows: JSX.Element[][];
    style?: JSX.CSSProperties;
}

export function Table(props: TableProps) {
    return <table>
        <thead>
            <tr>
                {props.heading.map((e) => (
                    <th class="">{e}</th>
                ))}
            </tr>
        </thead>

        <tbody>
            {props.rows.map((row) => (
                <tr>
                    {row.map((item, _i) => (
                        <td>{item}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
}

export type SuperTableProps = {
    table: TableProps;
    headerstart?: JSX.Element;
    headerend?: JSX.Element;
    footerstart?: JSX.Element;
    footerend?: JSX.Element;
    class?: string;
    style?: JSX.CSSProperties;
};

export function SuperTable(props: SuperTableProps) {
    return (
        <div class={[props.class, CssADV.SuperTable].join(" ")}
            style={props.style}
        >
            {!(props.headerstart || props.headerend) ? null : (
                <div class={CssADV.TableHeader}>
                    {props.headerstart}
                    {props.headerend}
                </div>
            )}

            <Table heading={props.table.heading} rows={props.table.rows} style={props.table.style} />

            {!(props.footerstart || props.footerend) ? null : (
                <div class={CssADV.TableFooter}>
                    {props.footerstart}
                    {props.footerend}
                </div>
            )}
        </div>
    );
}
