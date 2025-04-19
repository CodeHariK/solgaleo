import { createSignal, onMount } from "solid-js";
import { CssUI } from "./gen";
import { IconMoon, IconSun } from "../gen";

export type Theme = {
    name: string;
    type: 'light' | 'night';
}

let THEMECOUNT = 0
let THEME: Theme[] = [
    {
        name: "light",
        type: "light",
    },
    {
        name: "night",
        type: "night",
    }];

export function AddTheme(theme: Theme) {
    if (theme.name != "light" && theme.name != "night") {
        THEME.push(theme)
    }
}

export function AllTheme() {
    return THEME
}

export function CurrentTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (THEME.filter((e) => e.name == savedTheme)) {
        return savedTheme
    } else {
        const prefersNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersNight ? "night" : "light";
    }
}

function changeTheme(newTheme: Theme) {
    if (!newTheme) return
    if (newTheme.name != "light" && newTheme.name != "night") {
        document.documentElement.className = newTheme.type + " " + newTheme.name;
    } else {
        document.documentElement.className = newTheme.name;
    }
}

export function ThemeToggle() {
    // Signal to store the current theme ("light" or "dark")
    const [theme, setTheme] = createSignal<Theme>({ name: "light", type: "light" });

    // Function to manually toggle between light and dark themes
    const toggleTheme = () => {
        THEMECOUNT = (THEMECOUNT + 1) % THEME.length
        const newTheme = THEME[THEMECOUNT]
        setTheme(newTheme);
        changeTheme(newTheme);
        localStorage.setItem("theme", newTheme.name);
    };

    // Detect system theme preference and apply it on mount
    onMount(() => {
        const savedTheme = CurrentTheme();
        THEMECOUNT = THEME.findIndex((e) => e.name == savedTheme)
        let theme = THEME[THEMECOUNT]
        changeTheme(theme);
        setTheme(theme);
    });

    return (
        <button
            class={CssUI.IconButton}
            type="button"
            onClick={toggleTheme}
        > {theme().name} {theme().type === "night" ? <IconMoon /> : <IconSun />}
        </button>
    );
}
