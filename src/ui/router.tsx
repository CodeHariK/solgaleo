import { createContext, JSX, onMount, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { AddTheme, Theme } from "./theme_toggle";

interface SolData {
    baseroute: string,
    customThemes: Theme[],
}

interface SolContextType {
    data: SolData;
    setData: (key: keyof SolData, value: any) => void;
}

// Create the context
const SolContext = createContext<SolContextType>();

export const SolProvider = (props: { initialData: SolData; children: JSX.Element | JSX.Element[] }) => {
    const [data, setData] = createStore<SolData>(props.initialData);

    onMount(() => {
        console.log("SolStart", props.initialData)

        props.initialData.customThemes.forEach((theme) => {
            AddTheme(theme)
        })
    })

    return (
        <SolContext.Provider value={{ data, setData }}>
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
