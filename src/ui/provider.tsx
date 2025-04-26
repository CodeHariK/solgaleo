import { createContext, JSX, onMount, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Theme, ThemeMount } from "./theme_toggle";

export interface SolData {
    baseroute: string,
    themes: Theme[],
    themeIndex?: number
}

interface SolContextType {
    data: SolData;
    setData: (key: keyof SolData, value: any) => void;
    getTheme: () => Theme | undefined;
}

// Create the context
const SolContext = createContext<SolContextType>();

export const SolProvider = (props: { initialData: SolData; children: JSX.Element | JSX.Element[] }) => {
    const [data, setData] = createStore<SolData>({
        ...props.initialData,
        themes: [
            {
                name: "light",
                type: "light",
            },
            {
                name: "night",
                type: "night",
            },
            ...props.initialData.themes.filter((theme) => theme.name != "light" && theme.name != "night")
        ]
    });

    onMount(() => {
        console.log("SolStart", data)
        ThemeMount(data, setData)
    })

    const getTheme = () => {
        return data.themes[data.themeIndex]
    }

    return (
        <SolContext.Provider value={{ data, setData, getTheme }}>
            {props.children}
        </SolContext.Provider>
    );
};

export const useSolContext = () => {
    const context = useContext(SolContext);
    if (!context) {
        throw new Error("useSolContext must be used within a SolProvider");
    }
    return context;
};
