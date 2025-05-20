import '../gen.css'

export * from "./position.tsx"; 
export * from "./card.tsx"; 
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
    Card: "Card",
    CardHeader: "CardHeader",
    CardContent: "CardContent",
    CardFooter: "CardFooter",
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
    ButtonIcon: "ButtonIcon",
    ButtonMaterial: "ButtonMaterial",
    ButtonOutlined: "ButtonOutlined",
    ButtonMaterialRound: "ButtonMaterialRound",
    ButtonOutlinedRound: "ButtonOutlinedRound",
    ButtonIconPlain: "ButtonIconPlain",
    ButtonIconMaterial: "ButtonIconMaterial",
    ButtonIconMaterialRev: "ButtonIconMaterialRev",
    ButtonRev: "ButtonRev",
    ButtonRoundRev: "ButtonRoundRev",
    ButtonMaterialRev: "ButtonMaterialRev",
    ButtonMaterialRoundRev: "ButtonMaterialRoundRev",
    ButtonOutlinedPlain: "ButtonOutlinedPlain",
    ButtonOutlinedRoundPlain: "ButtonOutlinedRoundPlain",
    ButtonRound: "ButtonRound",
    ButtonErrorRound: "ButtonErrorRound",
    ButtonErrorOutlinedRound: "ButtonErrorOutlinedRound",
    ButtonGradient: "ButtonGradient",
    ButtonError: "ButtonError",
    ButtonErrorOutlined: "ButtonErrorOutlined",
    ButtonElevated: "ButtonElevated",
    SelectionOptions: "selection-options",
    Option: "option",
    SelectChevron: "SelectChevron",
    Chips: "Chips",
    Chip: "Chip",
    ChipSelected: "ChipSelected",
    ChipDisabled: "ChipDisabled",
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
    varInputAccentColor: "--input-accent-color"

    
} as const;

export type CssUIType = keyof typeof CssUI;
