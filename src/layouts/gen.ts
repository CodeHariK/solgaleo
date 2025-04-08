import '../base.css'
import "./gen.css"

export * from "./grid.tsx";
export * from "./SpaceLayout.tsx";

export const SolCSS = {
    GridLayout: "GridLayout",
    GridLayoutFixed: "GridLayoutFixed",
    GridLayoutScroll: "GridLayoutScroll",
    GridHeader: "GridHeader",
    GridFooter: "GridFooter",
    GridLeft: "GridLeft",
    GridRight: "GridRight",
    GridMiddle: "GridMiddle",
    GridScrollContainer: "GridScrollContainer",
    GridContent: "GridContent",
    GridLayoutFlow: "GridLayoutFlow",
    ListContainer: "ListContainer",
    List: "List",
    ListItem: "ListItem",
    Red: "Red",
    Orange: "Orange",
    Blue: "Blue",
    Green: "Green"
} as const;

export type SolCSSType = keyof typeof SolCSS;
