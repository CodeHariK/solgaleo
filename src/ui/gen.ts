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


export const CssUI = {
    PositionBox: "PositionBox",
    SolDragBox: "SolDragBox",
    UploadContainer: "UploadContainer",
    Dropzone: "Dropzone",
    DropzoneDragging: "DropzoneDragging",
    ImagePreview: "ImagePreview",
    ImagePreviewInvalid: "ImagePreviewInvalid",
    InvalidMessage: "InvalidMessage",
    HiddenInput: "HiddenInput",
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
    Avatar: "avatar",
    Dropdown: "Dropdown",
    DropdownHeader: "DropdownHeader",
    DropdownItem: "DropdownItem",
    DropdownNested: "DropdownNested",
    DropdownToggle: "DropdownToggle",
    IconButton: "IconButton",
    MaterialButton: "MaterialButton",
    OutlinedButton: "OutlinedButton",
    SelectChevron: "SelectChevron",
    Input: "Input",
    InputIcon: "InputIcon",
    InputEnd: "InputEnd",
    ErrorTextInput: "ErrorTextInput",
    ErrorText: "ErrorText",
    RangeValue: "RangeValue",

    varPositionBoxButtonColHover: "--PositionBox--button-col-hover",
    varPositionBoxButtonBackgroundColorHover: "--PositionBox--button-background-color-hover",
    varPrimary: "--primary",
    varSurface: "--surface",
    varACol: "--a-col",
    varAColHover: "--a--col-hover",
    varAColActive: "--a--col-active",
    varDropdownBg: "--Dropdown-bg",
    varDropdownHeaderCol: "--DropdownHeader-col",
    varDropdownHeaderBg: "--DropdownHeader-bg",
    varDropdownHeaderBorder: "--DropdownHeader-border",
    varDropdownItemCol: "--DropdownItem-col",
    varDropdownItemBg: "--DropdownItem-bg",
    varDropdownItemBorder: "--DropdownItem-border",
    varDropdownItemColHover: "--DropdownItem-col-hover",
    varDropdownItemBgHover: "--DropdownItem-bg-hover",
    varSurfaceContainer: "--surface-container",
    varPrimaryContainer: "--primary-container",
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
    varIconBorder: "--icon-border",
    varThemeToggleCol: "--theme-toggle-col",
    varThemeToggleBgHover: "--theme-toggle-bg-hover",
    varSecondary: "--secondary",
    varInputAccentColor: "--input-accent-color",
    varLabelDisabledColor: "--label-disabled-color",
    varLabelTransformX: "--label-transform-x",
    varLabelTransformY: "--label-transform-y",
    varLabelScale: "--label-scale",
    varInputLabelFocusColor: "--input-label-focus-color",
    varInputLabelFocusBg: "--input-label-focus-bg",
    varError: "--error",
    varSecondaryContainer: "--secondary-container",
    varInputBg: "--input-bg",
    varInputLabelBorder: "--Input-label-border"
} as const;

export type CssUIType = keyof typeof CssUI;
