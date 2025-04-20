import { For, createSignal, JSX, createEffect, onMount, onCleanup } from 'solid-js';
import { CssNAV } from './gen';
import { CssUI } from '../gen';

/*CSS:-
.TabsContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.TabsLevels {
    display: flex;
    flex-direction: column;
}

.TabLevel {
    display: flex;
    flex-direction: row;
    align-self: start;
}

.TabContent {
    flex: 1;
    overflow: auto;
}

*/

function updateQueryParam(key: string, value: string): void {
    // Get the current URL
    const url = new URL(window.location.href);

    // Update the query parameter
    url.searchParams.set(key, value);

    // Update the browser's address bar
    window.history.pushState({}, '', url.toString());
}

const parseParams = () => {
    const params = new URLSearchParams(location.search);
    const result: Record<string, string> = {};

    for (const [key, value] of params.entries()) {
        result[key] = value;
    }

    return result;
};

type Tab = {
    id: string;
    label: string;
    content?: JSX.Element;
    children?: Tab[];
};

type TabsProps = {
    id: string;
    tabs: Tab[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
    styles?: {
        container?: JSX.CSSProperties;    // Additional styles for TabsContainer
        levels?: JSX.CSSProperties;       // Additional styles for TabsLevels
        level?: JSX.CSSProperties;        // Additional styles for each TabLevel
        button?: JSX.CSSProperties;       // Additional styles for TabButton
        content?: JSX.CSSProperties;      // Additional styles for TabContent
    };
};

export function findTabsByPath(tabs: Tab[], path: string[]): Tab[][] {
    const result: Tab[][] = [tabs];
    let current = tabs;
    let currentTab: Tab | undefined;

    for (const pathId of path) {
        currentTab = current.find(t => t.id === pathId);
        if (currentTab?.children) {
            result.push(currentTab.children);
            current = currentTab.children;
        }
    }

    return result;
}

export function Tabs(props: TabsProps) {
    const [activePath, setActivePath] = createSignal<string[]>([]);
    const [visibleTabs, setVisibleTabs] = createSignal<Tab[][]>([props.tabs]);
    const [tabContent, setTabContent] = createSignal<JSX.Element | undefined>();

    // Get current instance's tab state
    const getCurrentTab = () => {
        const states = parseParams();

        return states[props.id] || props.defaultTab || props.tabs[0]?.id;
    };

    const [currentTab, setCurrentTab] = createSignal(getCurrentTab());

    const handleLocationChange = () => {
        const newTab = getCurrentTab();

        if (newTab !== currentTab()) {
            setCurrentTab(newTab);
        }
    };

    // Listen for route changes using location.search
    onMount(() => {
        handleLocationChange()
        window.addEventListener('route-change', handleLocationChange);
        window.addEventListener('popstate', handleLocationChange);
    });

    onCleanup(() => {
        window.removeEventListener('route-change', handleLocationChange)
        window.removeEventListener('popstate', handleLocationChange);
    })


    function updateContent(path: string[]) {

        // Set initial content
        let content: JSX.Element | undefined;
        let allTabs = props.tabs;

        let leaf = ""

        for (const pathId of path) {
            const tab = allTabs.find(t => t.id === pathId);
            if (tab?.content) {
                content = tab.content
                leaf = ""
            } else if (tab?.children && tab?.children[0]?.content) {
                content = tab?.children[0]?.content
                leaf = tab?.children[0]?.id
            }
            if (tab?.children) allTabs = tab.children;
        }
        setTabContent(content);

        if (leaf) {
            path.push(leaf)
        }

        setActivePath(path);
        setVisibleTabs(findTabsByPath(props.tabs, path));
    }

    const handleTabClick = (tab: Tab, level: number) => {
        const newPath = [...activePath().slice(0, level), tab.id];

        updateContent(newPath)

        let tabId = newPath.join('.')

        setCurrentTab(tabId);

        // Update URL while preserving other tab states
        const params = new URLSearchParams(location.search);
        params.set(props.id, tabId);

        updateQueryParam(props.id, tabId);

        props.onTabChange?.(tabId);
    };

    createEffect(() => {
        if (currentTab()) {
            const path = currentTab().split('.');
            updateContent(path);
        }
    });

    return (
        <div class={CssNAV.TabsContainer} style={props.styles?.container}>
            <div class={CssNAV.TabsLevels} style={props.styles?.levels}>
                <For each={visibleTabs()}>
                    {(levelTabs, level) => (
                        <div class={CssNAV.TabLevel}
                            style={{
                                ...props.styles?.level,
                                "padding-left": `${level() * 1}rem`
                            }}>
                            <For each={levelTabs}>
                                {(tab) => (
                                    <button
                                        class={`${activePath()[level()] === tab.id ? CssUI.MaterialButton : CssUI.OutlinedButton}`}
                                        style={props.styles?.button}
                                        onClick={() => handleTabClick(tab, level())}
                                    >
                                        {tab.label}
                                    </button>
                                )}
                            </For>
                        </div>
                    )}
                </For>
            </div>

            <div class={CssNAV.TabContent} style={props.styles?.content}>
                {tabContent()}
            </div>
        </div>
    );
}
