import { CssUI, SolData, useSolContext } from "./gen";
import { IconMoon, IconSun } from "../gen";

export type Theme = {
    name: string;
    type: 'light' | 'night';
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
    const { data, setData } = useSolContext();

    // Function to manually toggle between light and dark themes
    const toggleTheme = () => {
        let themeIndex = (data.themeIndex + 1) % data.themes.length

        setData("themeIndex", themeIndex);

        const newTheme = data.themes[themeIndex]

        changeTheme(newTheme);

        localStorage.setItem("theme", newTheme.name);
    };

    return <button
        class={CssUI.IconButton}
        type="button"
        onClick={toggleTheme}
    > {data.themes[data?.themeIndex]?.name} {data.themes[data?.themeIndex]?.type === "night" ? <IconMoon /> : <IconSun />}
    </button>

}

export function ThemeMount(data: SolData, setData: (key: keyof SolData, value: any) => void) {
    let savedTheme = localStorage.getItem("theme");

    if (!data.themes.filter((e) => e.name == savedTheme)) {
        const prefersNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
        savedTheme = prefersNight ? "night" : "light";
    }

    let themeIndex = data.themes.findIndex((e) => e.name == savedTheme);
    if (themeIndex < 0) themeIndex = 0;

    const theme = data.themes[themeIndex];

    changeTheme(theme);

    setData("themeIndex", themeIndex);
}

