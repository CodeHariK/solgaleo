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
    SolOutlinedButton: "SolOutlinedButton",

    varSolPositionBoxButtonCol: "--SolPositionBox--button-col",
    varSolPositionBoxButtonBg: "--SolPositionBox--button-bg",
    varSolPositionBoxButtonBorder: "--SolPositionBox--button-border",
    varSolPositionBoxButtonColHover: "--SolPositionBox--button-col-hover",
    varSolPositionBoxButtonBackgroundColorHover: "--SolPositionBox--button-background-color-hover",
    varLabelTransformX: "--label-transform-x",
    varLabelTransformY: "--label-transform-y",
    varLabelScale: "--label-scale",
    varInputLabelFocusColor: "--input-label-focus-color",
    varInputLabelFocusBg: "--input-label-focus-bg",
    varAppTextInputCol: "--AppTextInput-col",
    varAppTextInputBg: "--AppTextInput-bg",
    varAppTextInputBorder: "--AppTextInput-border",
    varAppTextInputBorderRadius: "--AppTextInput-border-radius",
    varAppTextInputBorderColorFocus: "--AppTextInput--border-color-focus",
    varAppTextInputBoxShadowFocus: "--AppTextInput--box-shadow-focus",
    varAppTextInputDataHasLabelFalseColPlaceholder: "--AppTextInput--data-has-label--false--col-placeholder",
    varAppTextInputColPlaceholder: "--AppTextInput--col-placeholder",
    varSolInputLabelCol: "--SolInputLabel-col",
    varSolInputLabelBorder: "--SolInputLabel-border",
    varSolDropdownBg: "--SolDropdown-bg",
    varSolDropdownHeaderCol: "--SolDropdownHeader-col",
    varSolDropdownHeaderBg: "--SolDropdownHeader-bg",
    varSolDropdownHeaderBorder: "--SolDropdownHeader-border",
    varSolDropdownItemCol: "--SolDropdownItem-col",
    varSolDropdownItemBg: "--SolDropdownItem-bg",
    varSolDropdownItemBorder: "--SolDropdownItem-border",
    varSolDropdownItemColHover: "--SolDropdownItem-col-hover",
    varSolDropdownItemBgHover: "--SolDropdownItem-bg-hover",
    varMatColor: "--mat-color",
    varMatBg: "--mat-bg",
    varMatBorder: "--mat-border",
    varMatHoverColor: "--mat-hover-color",
    varMatHoverBg: "--mat-hover-bg",
    varMatFocusColor: "--mat-focus-color",
    varMatFocusBg: "--mat-focus-bg",
    varOutColor: "--out-color",
    varOutBg: "--out-bg",
    varOutBorder: "--out-border",
    varOutHoverColor: "--out-hover-color",
    varOutHoverBg: "--out-hover-bg",
    varOutFocusColor: "--out-focus-color",
    varOutFocusBg: "--out-focus-bg",
    varInputAccentColor: "--input-accent-color",
    varLabelDisabledColor: "--label-disabled-color",
    varLabelCol: "--label-col",
    varLabelPCol: "--label-p-col",
    varThemeToggleCol: "--theme-toggle-col",
    varThemeToggleBgHover: "--theme-toggle-bg-hover"
} as const;

export type SolCSSType = keyof typeof SolCSS;
