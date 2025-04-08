import '../base.css'
import "./gen.css"

export * from "./position.tsx";
export * from "./ratingsbar.tsx";
export * from "./uploadpic.tsx";
export * from "./textinput.tsx";
export * from "./search.tsx";
export * from "./heading.tsx";
export * from "./storybook.tsx";
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
