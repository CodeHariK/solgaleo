import { For, createSignal, JSX, createEffect } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';

/* CSS:
.tabs-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: var(--surface-background, #ffffff);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tabs-levels {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    background: var(--header-background, #f9fafb);
    border-radius: 0.5rem 0.5rem 0 0;
}

.tab-level {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem;
    position: relative;
}

.tab-level:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 2rem;
    right: 2rem;
    height: 1px;
    background: var(--border-color, #e5e7eb);
    opacity: 0.5;
}

.tab-level.level-0 { 
    padding-left: 1rem;
}
.tab-level.level-1 { 
    padding-left: 2.5rem; 
    background: rgba(0, 0, 0, 0.02); 
}
.tab-level.level-2 {
    padding-left: 4rem;
    background: rgba(0, 0, 0, 0.03);
}

.tab-button {
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 0.375rem;
    color: var(--text-color, #374151);
    font-size: calc(0.875rem + (0.125rem / var(--level, 0)));
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

.tab-button:hover {
    background: var(--surface-hover, rgba(0, 0, 0, 0.05));
    color: var(--primary-color, #2563eb);
}

.tab-button.active {
    background: var(--primary-color, #2563eb);
    color: white;
}

.tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0.5rem;
    right: 0.5rem;
    height: 2px;
    background: currentColor;
    border-radius: 1px;
}

.tab-content {
    flex: 1;
    padding: 1.5rem;
    overflow: auto;
    background: var(--content-background, #ffffff);
    border-radius: 0 0 0.5rem 0.5rem;
}

.tab-path {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    color: var(--text-muted, #6b7280);
    font-size: 0.875rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
}

.path-separator {
    color: var(--text-muted, #6b7280);
    font-size: 0.75rem;
}

.path-item {
    color: var(--text-color, #374151);
    transition: color 0.2s ease;
}

.path-item:hover {
    color: var(--primary-color, #2563eb);
}

.path-item:last-child {
    color: var(--primary-color, #2563eb);
    font-weight: 600;
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

    const handleTabChange = (tabId: string) => {
        setCurrentTab(tabId);

        // Update URL while preserving other tab states
        const params = new URLSearchParams(location.search);
        params.set(props.id, tabId);

        const route = props.baseRoute || location.pathname;
        navigate(`${route}?${params.toString()}`);
    };

    return (
        <div class="tabs-container">
            <Tabs
                tabs={props.tabs}
                defaultTab={currentTab()}
                onTabChange={handleTabChange}
            />
        </div>
    );
}

type Tab = {
    id: string;
    label: string;
    content?: JSX.Element;
    children?: Tab[];
};

type TabPath = {
    id: string;
    label: string;
    level: number;
};

type TabsProps = {
    tabs: Tab[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
    level?: number;
    activePath?: TabPath[];
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

    // Initialize from defaultTab if provided
    createEffect(() => {
        if (props.defaultTab) {
            const path = props.defaultTab.split('/');
            setActivePath(path);
            setVisibleTabs(findTabsByPath(props.tabs, path));
        }
    });

    const handleTabClick = (tab: Tab, level: number) => {
        const newPath = [...activePath().slice(0, level), tab.id];
        setActivePath(newPath);
        setVisibleTabs(findTabsByPath(props.tabs, newPath));
        // Use dot notation instead of slash
        props.onTabChange?.(newPath.join('.'));
    };

    // Initialize from defaultTab if provided
    createEffect(() => {
        if (props.defaultTab) {
            // Split by dot instead of slash
            const path = props.defaultTab.split('.');
            setActivePath(path);
            setVisibleTabs(findTabsByPath(props.tabs, path));
        }
    });

    return (
        <div class="tabs-container">
            <div class="tabs-levels">
                <For each={visibleTabs()}>
                    {(levelTabs, level) => (
                        <div class={`tab-level level-${level()}`}>
                            <For each={levelTabs}>
                                {(tab) => (
                                    <button
                                        class={`tab-button ${activePath()[level()] === tab.id ? 'active' : ''
                                            }`}
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

            <div class="tab-content">
                {(() => {
                    let content: JSX.Element | undefined;
                    let current = props.tabs;
                    for (const pathId of activePath()) {
                        const tab = current.find(t => t.id === pathId);
                        if (tab?.content) content = tab.content;
                        if (tab?.children) current = tab.children;
                    }
                    return content;
                })()}
            </div>
        </div>
    );
}
