import { For, createSignal, JSX, createEffect } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import { CssNAV } from './gen';

/* CSS:
.tabs-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.tabs-levels {
    display: flex;
    flex-direction: column;
}

.tab-level {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
}

.tab-button {
    padding: 0.5rem 1rem;
    border: none;
    transition: all 0.2s ease;
}

.tab-button.active {
    background: var(--primary-color, #972579);
    color: white;
}

.tab-content {
    flex: 1;
    overflow: auto;
    background: #f94d4d;
}

*/

type RoutedTabsProps = {
    tabs: Tab[];
    defaultTab?: string;
    baseRoute?: string;
    id: string; // Add unique identifier
};

export function RoutedTabs(props: RoutedTabsProps) {
    const navigate = useNavigate();
    const location = useLocation();

    // Parse query params instead of hash
    const parseParams = () => {
        const params = new URLSearchParams(location.search);
        const result: Record<string, string> = {};

        for (const [key, value] of params.entries()) {
            result[key] = value;
        }

        return result;
    };

    // Get current instance's tab state
    const getCurrentTab = () => {
        const states = parseParams();

        return states[props.id] || props.defaultTab || props.tabs[0]?.id;
    };

    const [currentTab, setCurrentTab] = createSignal(getCurrentTab());

    // Listen for route changes using location.search
    createEffect(() => {
        const handleLocationChange = () => {
            const newTab = getCurrentTab();
            if (newTab !== currentTab()) {
                setCurrentTab(newTab);
            }
        };

        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    });


    return (
        <Tabs
            tabs={props.tabs}
            defaultTab={currentTab()}
            id={props.id}
            onTabChange={
                (tabId: string) => {
                    setCurrentTab(tabId);

                    // Update URL while preserving other tab states
                    const params = new URLSearchParams(location.search);
                    params.set(props.id, tabId);

                    const route = props.baseRoute || location.pathname;
                    navigate(`${route}?${params.toString()}`);
                }
            }
        />
    );
}

type Tab = {
    id: string;
    label: string;
    content?: JSX.Element;
    children?: Tab[];
};

type TabsProps = {
    tabs: Tab[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
    id: string;
};

function findTabsByPath(tabs: Tab[], path: string[]): Tab[][] {
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

    function updateContent(path: string[]) {

        // Set initial content
        let content: JSX.Element | undefined;
        let current = props.tabs;

        let leaf = ""

        for (const pathId of path) {
            const tab = current.find(t => t.id === pathId);
            if (tab?.content) {
                content = tab.content
                leaf = ""
            } else if (tab?.children && tab?.children[0]?.content) {
                content = tab?.children[0]?.content
                leaf = tab?.children[0]?.id
            }
            if (tab?.children) current = tab.children;
        }
        setTabContent(content);

        if (leaf) {
            path.push(leaf)
        }

        setActivePath(path);
        setVisibleTabs(findTabsByPath(props.tabs, path));
    }

    const handleTabClick = (tab: Tab, level: number) => {
        // Check if we're clicking the same tab at the same level
        if (activePath()[level] === tab.id) {
            return; // Do nothing if clicking the same tab
        }

        const newPath = [...activePath().slice(0, level), tab.id];

        updateContent(newPath)

        props.onTabChange?.(newPath.join('.'));
    };

    // Initialize from defaultTab if provided
    createEffect(() => {
        if (props.defaultTab) {
            // Split by dot instead of slash
            const path = props.defaultTab.split('.');

            updateContent(path);
        }
    });

    return (
        <div class={CssNAV.TabsContainer}>
            <div class={CssNAV.TabsLevels}>
                <For each={visibleTabs()}>
                    {(levelTabs, level) => (
                        <div class={CssNAV.TabLevel} style={{ "padding-left": `${level() * 1.5}rem` }}>
                            <For each={levelTabs}>
                                {(tab) => (
                                    <button
                                        class={`${CssNAV.TabButton} ${activePath()[level()] === tab.id ? 'active' : ''}`}
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

            <div class={CssNAV.TabContent}>
                {props.id} : {activePath().join(".")}
                {tabContent()}
            </div>

            <br />
        </div>
    );
}
