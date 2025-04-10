import '../gen.css'
import "./gen.css"
export * from "./position.tsx";
export * from "./ratingsbar.tsx";
export * from "./uploadpic.tsx";
export * from "./gridlayout.tsx";
export * from "./heading.tsx";
export * from "./SpaceLayout.tsx";
export * from "./dropdown.tsx";
export * from "./theme_toggle.tsx";
export * from "./input.tsx";
export * from "./spaceform.tsx";


export const SolCSS = {
    SolPositionBox: "SolPositionBox",
    SolDragBox: "SolDragBox",
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
    Avatar: "avatar",
    SolDropdown: "SolDropdown",
    SolDropdownHeader: "SolDropdownHeader",
    SolDropdownItem: "SolDropdownItem",
    IconButton: "IconButton",
    MaterialButton: "MaterialButton",
    OutlinedButton: "OutlinedButton",
    Input: "Input",
    InputIcon: "InputIcon",
    InputEnd: "InputEnd",
    ErrorTextInput: "ErrorTextInput",
    ErrorText: "ErrorText",
    RangeValue: "RangeValue",

    varSolPositionBoxButtonCol: "--SolPositionBox--button-col",
    varSolPositionBoxButtonBg: "--SolPositionBox--button-bg",
    varSolPositionBoxButtonBorder: "--SolPositionBox--button-border",
    varSolPositionBoxButtonColHover: "--SolPositionBox--button-col-hover",
    varSolPositionBoxButtonBackgroundColorHover: "--SolPositionBox--button-background-color-hover",
    varSolDropdownBg: "--SolDropdown-bg",
    varSolDropdownHeaderCol: "--SolDropdownHeader-col",
    varSolDropdownHeaderBg: "--SolDropdownHeader-bg",
    varSolDropdownHeaderBorder: "--SolDropdownHeader-border",
    varSolDropdownItemCol: "--SolDropdownItem-col",
    varSolDropdownItemBg: "--SolDropdownItem-bg",
    varSolDropdownItemBorder: "--SolDropdownItem-border",
    varSolDropdownItemColHover: "--SolDropdownItem-col-hover",
    varSolDropdownItemBgHover: "--SolDropdownItem-bg-hover",
    varIconBg: "--icon-bg",
    varIconBorderRadius: "--icon-border-radius",
    varIconHoverBg: "--icon-hover-bg",
    varMatColor: "--mat-color",
    varMatBg: "--mat-bg",
    varMatBorder: "--mat-border",
    varMatHoverColor: "--mat-hover-color",
    varMatHoverBg: "--mat-hover-bg",
    varOutColor: "--out-color",
    varOutBg: "--out-bg",
    varOutBorder: "--out-border",
    varOutHoverColor: "--out-hover-color",
    varOutHoverBg: "--out-hover-bg",
    varButtonCol: "--button-col",
    varIconBorder: "--icon-border",
    varThemeToggleCol: "--theme-toggle-col",
    varThemeToggleBgHover: "--theme-toggle-bg-hover",
    varInputAccentColor: "--input-accent-color",
    varLabelDisabledColor: "--label-disabled-color",
    varLabelCol: "--label-col",
    varLabelPCol: "--label-p-col",
    varInputBg: "--input-bg",
    varLabelTransformX: "--label-transform-x",
    varLabelTransformY: "--label-transform-y",
    varLabelScale: "--label-scale",
    varInputLabelFocusColor: "--input-label-focus-color",
    varInputLabelFocusBg: "--input-label-focus-bg",
    varInputInputInputInputTextareaCol: "--Input-Input-input--Input-textarea-col",
    varInputInputInputColPlaceholder: "--Input-Input--input-col-placeholder",
    varInputLabelCol: "--Input-label-col",
    varInputLabelBorder: "--Input-label-border",
    varErrorTextCol: "--ErrorText-col"
} as const;

export type SolCSSType = keyof typeof SolCSS;
