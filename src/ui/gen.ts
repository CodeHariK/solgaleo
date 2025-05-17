import '../gen.css'

export * from "./position.tsx"; 
export * from "./gridlayout.tsx"; 
export * from "./grid.tsx"; 
export * from "./accordion.tsx"; 
export * from "./bar.tsx"; 
export * from "./button.tsx"; 
export * from "./theme_toggle.tsx"; 
export * from "./input.tsx"; 
export * from "./spaceform.tsx"; 
export * from "./provider.tsx";


export const CssUI = {
    DragBox: "DragBox",
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
    Grid: "grid",
    AccordionLabel: "AccordionLabel",
    AccordionContent: "AccordionContent",
    Progress: "Progress",
    ProgressFill: "ProgressFill",
    IconButton: "IconButton",
    MaterialButton: "MaterialButton",
    OutlinedButton: "OutlinedButton",
    MaterialRoundButton: "MaterialRoundButton",
    OutlinedRoundButton: "OutlinedRoundButton",
    Tag: "Tag",
    GradientTag: "GradientTag",
    ErrorButton: "ErrorButton",
    SelectChevron: "SelectChevron",
    ToggleSwitch: "ToggleSwitch",
    ToggleThumb: "ToggleThumb",
    ToggleChecked: "ToggleChecked",
    Input: "Input",
    InputIcon: "InputIcon",
    InputEnd: "InputEnd",
    ErrorTextInput: "ErrorTextInput",
    ErrorText: "ErrorText",
    RangeValue: "RangeValue",
    UploadContainer: "UploadContainer",
    Dropzone: "Dropzone",
    DropzoneDragging: "DropzoneDragging",
    ImagePreview: "ImagePreview",
    ImagePreviewInvalid: "ImagePreviewInvalid",
    InvalidMessage: "InvalidMessage",
    HiddenInput: "HiddenInput",

    varInputBg: "--input-bg",
    varIconBg: "--icon-bg",
    varIconBorderRadius: "--icon-border-radius",
    varIconBorder: "--icon-border",
    varIconHoverBg: "--icon-hover-bg",
    varMatBg: "--mat-bg",
    varMatColor: "--mat-color",
    varMatBorder: "--mat-border",
    varMatHoverBg: "--mat-hover-bg",
    varMatHoverColor: "--mat-hover-color",
    varOutBg: "--out-bg",
    varOutColor: "--out-color",
    varOutBorder: "--out-border",
    varOutHoverBg: "--out-hover-bg",
    varOutHoverColor: "--out-hover-color",
    varInputAccentColor: "--input-accent-color"

    
} as const;

export type CssUIType = keyof typeof CssUI;
