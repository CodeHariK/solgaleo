import { JSX } from "solid-js";

/*CSS:

@media (min-width: 0px) {
    .grid {
        --cols: var(--cols-xs);
        --rows: var(--rows-xs);
        --gap-x: var(--gap-x-xs);
        --gap-y: var(--gap-y-xs);
    }
}
@media (min-width: 600px) {
    .grid {
        --cols: var(--cols-sm);
        --rows: var(--rows-sm);
        --gap-x: var(--gap-x-sm);
        --gap-y: var(--gap-y-sm);
    }
}
@media (min-width: 900px) {
    .grid {
        --cols: var(--cols-md);
        --rows: var(--rows-md);
        --gap-x: var(--gap-x-md);
        --gap-y: var(--gap-y-md);
    }
}
@media (min-width: 1200px) {
    .grid {
        --cols: var(--cols-lg);
        --rows: var(--rows-lg);
        --gap-x: var(--gap-x-lg);
        --gap-y: var(--gap-y-lg);
    }
}
*/

type BreakpointValue<T> = T | { xs?: T; sm?: T; md?: T; lg?: T };

export function Grid(props: {
    spacingX?: BreakpointValue<number>;
    spacingY?: BreakpointValue<number>;
    cols: BreakpointValue<number>;
    rows: BreakpointValue<number>;
    class?: string;
    style?: JSX.CSSProperties;
    children?: JSX.Element | JSX.Element[];
}) {
    const style: Record<string, string> = {};

    // Horizontal spacing
    if (typeof props.spacingX === "object") {
        for (const bp of ["xs", "sm", "md", "lg"]) {
            if (props.spacingX[bp] != null)
                style[`--gap-x-${bp}`] = `${props.spacingX[bp]}rem`;
        }
    } else if (typeof props.spacingX === "number") {
        style["--gap-x"] = `${props.spacingX}rem`;
    }

    // Vertical spacing
    if (typeof props.spacingY === "object") {
        for (const bp of ["xs", "sm", "md", "lg"]) {
            if (props.spacingY[bp] != null)
                style[`--gap-y-${bp}`] = `${props.spacingY[bp]}rem`;
        }
    } else if (typeof props.spacingY === "number") {
        style["--gap-y"] = `${props.spacingY}rem`;
    }

    // Columns
    if (typeof props.cols === "object") {
        for (const bp of ["xs", "sm", "md", "lg"]) {
            if (props.cols[bp] != null)
                style[`--cols-${bp}`] = `${props.cols[bp]}`;
        }
    } else {
        style["--cols"] = `${props.cols}`;
    }

    // Rows
    if (typeof props.rows === "object") {
        for (const bp of ["xs", "sm", "md", "lg"]) {
            if (props.rows[bp] != null)
                style[`--rows-${bp}`] = `${props.rows[bp]}`;
        }
    } else {
        style["--rows"] = `${props.rows}`;
    }

    return (
        <main
            class={`grid ${props.class ?? ""}`}
            style={{
                display: "grid",
                "grid-template-columns": "repeat(var(--cols, 1), 1fr)",
                "grid-template-rows": "repeat(var(--rows, 1), 1fr)",
                "column-gap": "var(--gap-x)",
                "row-gap": "var(--gap-y)",
                ...style,
                ...props.style,
            }}
        >
            {props.children}
        </main>
    );
}

export function GridItem(props: {
    class?: string;
    style?: JSX.CSSProperties;
    colStart?: number;
    rowStart?: number;
    width?: number;
    height?: number;
    children?: JSX.Element | JSX.Element[];
}) {

    return (
        <div
            class={props.class}
            style={{
                ...props.style,
                "grid-column":
                    props.colStart != null
                        ? `${props.colStart + 1} / ${props.colStart + 1 + (props.width ?? 1)}`
                        : props.width != null
                            ? `span ${props.width}`
                            : undefined,
                "grid-row":
                    props.rowStart != null
                        ? `${props.rowStart + 1} / ${props.rowStart + 1 + (props.height ?? 1)}`
                        : props.height != null
                            ? `span ${props.height}`
                            : undefined,
            }}
        >
            {props.children}
        </div>
    );
}
