import '../gen.css'
import "./gen.css"
export * from "./position.tsx";
export * from "./ratingsbar.tsx";
export * from "./uploadpic.tsx";
export * from "./textinput.tsx";
export * from "./gridlayout.tsx";
export * from "./search.tsx";
export * from "./heading.tsx";
export * from "./SpaceLayout.tsx";
export * from "./dropdown.tsx";
export * from "./button.tsx";
export * from "./checkbox.tsx";
export * from "./theme_toggle.tsx";
export * from "./spaceform.tsx";


export const SolCSS = {
    SolPositionBox: "SolPositionBox",
    SolDragBox: "SolDragBox",
    AppTextInput: "AppTextInput",
    AppErrorTextInput: "AppErrorTextInput",
    AppErrorText: "AppErrorText",
    SolInputIcon: "SolInputIcon",
    SolPasswordIcon: "SolPasswordIcon",
    SolInputLabel: "SolInputLabel",
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
    Green: "Green",
    Searchinput: "searchinput",
    Avatar: "avatar",
    SolDropdown: "SolDropdown",
    SolDropdownHeader: "SolDropdownHeader",
    SolDropdownItem: "SolDropdownItem",
    SolButtonBase: "SolButtonBase",
    SolIconButton: "SolIconButton",
    SolMaterialButton: "SolMaterialButton",
    SolOutlinedButton: "SolOutlinedButton"
} as const;

export type SolCSSType = keyof typeof SolCSS;
