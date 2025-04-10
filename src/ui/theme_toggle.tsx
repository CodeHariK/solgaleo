import { createSignal, onMount } from "solid-js";

let THEMECOUNT = 0
let THEME = ["light", "night"];

export function AddTheme(theme: string) {
    THEME.push(theme)
}

export function AllTheme() {
    return THEME
}

export function CurrentTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (THEME.includes(savedTheme)) {
        return savedTheme
    } else {
        const prefersNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersNight ? "night" : "light";
    }
}

export function ThemeToggle() {
    // Signal to store the current theme ("light" or "dark")
    const [theme, setTheme] = createSignal("light");

    // Function to manually toggle between light and dark themes
    const toggleTheme = () => {
        THEMECOUNT = (THEMECOUNT + 1) % THEME.length
        const newTheme = THEME[THEMECOUNT]
        setTheme(newTheme);
        document.documentElement.className = newTheme;
        localStorage.setItem("theme", newTheme);
    };

    // Detect system theme preference and apply it on mount
    onMount(() => {
        const savedTheme = CurrentTheme();
        setTheme(savedTheme);
        document.documentElement.className = theme();
        THEMECOUNT = THEME.indexOf(savedTheme)
    });

    /*CSS:
        #theme-toggle {
            padding: 0.625rem; 
            border-radius: 0.5rem; 
            color: var : #60A5FA : #3B82F6 ; 
        }
        #theme-toggle:hover {
            background: var : #F3F4F6 : #374151 ; 
        }
    */

    return (
        <button
            id="theme-toggle"
            type="button"
            onClick={toggleTheme}
        > {theme() === "light" ?
            <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            :
            <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            ><path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd"
                clip-rule="evenodd"></path>
            </svg>}
        </button>
    );
}
