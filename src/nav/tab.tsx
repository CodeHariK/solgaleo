import { For, createSignal, JSX, onMount, onCleanup, Show, createEffect } from 'solid-js';
import { CssNAV, ParseUrlParams, UpdateQueryParam } from './gen';
import { CssUI } from '../gen';
import { createStore } from 'solid-js/store';

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

/*CSS:-
.TreeView {
    display: inline-flex;
    padding: 0.5rem;
    user-select: none;
    flex-direction: column;
}
.TreeItem {
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.TreeHeader {
    width: 8rem;
    overflow-x: clip;
    display: flex;
    align-items: center;
    // gap: 0.5rem;
    background: var(--surface);
    color: var(--primary);
    padding: 0.25rem;
    border: 1px solid;

    :hover {
        color: var(--secondary);
        background: var(--secondary-container);
    }
}
.TreeActive {
    background: var(--primary);
    color: var(--primary-container);
}

.TreeToggle {
    padding: 0rem .3rem;
    transition: all .3s ease;
}
.TreeToggleOpen {
    transform: rotate(180deg);
}

.TreeChildren {
    padding-left: 1rem;
}
*/

type Tab = {
    id: string
    label: string
    content?: JSX.Element
    children?: Tab[]
    open?: boolean
};

type TreeItemProps = {
    tab: Tab;
    activePath?: string;
    onClick?: (tab: Tab) => void;
};

export function useDelayedTruth(delay: number) {
    const [delayedState, setDelayedState] = createSignal(false);

    createEffect(() => {
        const timeoutId = setTimeout(() => {
            setDelayedState(true);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    });

    return [delayedState] as const;
}

const TreeItem = (props: TreeItemProps) => {
    const hasChildren = props.tab.children && props.tab.children.length > 0;
    const isExpanded = props.tab.open
    const [delayed] = useDelayedTruth(50);

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        props.onClick(props.tab);
    };

    return (
        <div class={`${CssNAV.TreeItem}`} onClick={handleClick}>
            <div
                classList={{
                    [CssNAV.TreeHeader]: true,
                    [CssNAV.TreeActive]: props.activePath?.startsWith(props.tab.id)
                }}
            >
                <div class={`${CssNAV.TreeToggle} ${(isExpanded && delayed()) ? CssNAV.TreeToggleOpen : ''}`}>
                    {hasChildren ? (isExpanded ? '-' : '+') : ""}
                </div>
                <span>{props.tab.label}</span>
            </div>

            <Show when={isExpanded && hasChildren}>
                <div class={`${CssNAV.TreeChildren}`}>
                    <For each={props.tab.children}>
                        {(child) => (<TreeItem {...props} tab={child} />)}
                    </For>
                </div>
            </Show>
        </div>
    );
};

type TreeviewProps = {
    tabsData: Tab[];
    activePath?: string;
    nested?: boolean;
    onClick?: (tab: Tab) => void;
};

export function Treeview(props: TreeviewProps) {

    const [tabs, setTabs] = createSignal(props.nested ? props.tabsData : convertTree(props.tabsData));

    const handleToggle = (tab: Tab) => {
        if (!props.nested) {
            let newData = activatePath(tabs(), tab.id)
            setTabs(newData)
        }
        props.onClick(tab)
    };

    return (
        <div class={`${CssNAV.TreeView}`}>
            <For each={props.nested ? props.tabsData : tabs()}>
                {(tab) => (
                    <TreeItem
                        tab={tab}
                        onClick={handleToggle}
                        activePath={props.activePath}
                    />
                )}
            </For>
        </div>
    );
}

function LevelTabs(props: {
    tabs: Tab[][],
    activePath?: string,
    handleTabClick: (tab: Tab) => void,
    tabLevelsStyle?: JSX.CSSProperties,
    tabLevelStyle?: JSX.CSSProperties,
    buttonStyle?: JSX.CSSProperties,
}) {
    return <div class={CssNAV.TabsLevels} style={props.tabLevelsStyle}>
        <For each={props.tabs}>
            {(levelTabs) => (
                <div class={CssNAV.TabLevel}
                    style={{
                        ...props.tabLevelStyle,
                    }}>
                    <For each={levelTabs}>
                        {(tab) => (
                            <button
                                class={`${props.activePath?.startsWith(tab.id) ? CssUI.MaterialButton : CssUI.OutlinedButton}`}
                                style={props.buttonStyle}
                                onClick={() => props.handleTabClick(tab)}
                            >
                                {tab.label}
                            </button>
                        )}
                    </For>
                </div>
            )}
        </For>
    </div>;
}

type TabsProps = {
    id: string;
    tabsData: Tab[];

    onTabChange?: (tabId: string) => void;

    showContent?: boolean
    showPathTabs?: boolean
    showTreeView?: boolean

    styles?: {
        tabContainer?: JSX.CSSProperties;    // Additional styles for TabsContainer
        tabLevels?: JSX.CSSProperties;       // Additional styles for TabsLevels
        tabLevel?: JSX.CSSProperties;        // Additional styles for each TabLevel
        button?: JSX.CSSProperties;       // Additional styles for TabButton
        content?: JSX.CSSProperties;      // Additional styles for TabContent
    };
};

export function NestedTabs(props: TabsProps) {

    const [tabStore, setTabStore] = createStore<{
        tabsData: Tab[],
        visibleTabs: Tab[][],
        activeTab: Tab | null,
        activePath: string,
    }>({
        tabsData: convertTree(props.tabsData),
        visibleTabs: [],
        activeTab: null,
        activePath: ""
    });

    onMount(() => {
        updateContent()
        window.addEventListener('route-change', updateContent);
        window.addEventListener('popstate', updateContent);
    });
    onCleanup(() => {
        window.removeEventListener('route-change', updateContent)
        window.removeEventListener('popstate', updateContent);
    })

    function updateContent() {

        let tabsData = tabStore.tabsData

        const states = ParseUrlParams();
        let activePath = (states[props.id] || tabsData[0]?.id) ?? ""

        const result: Tab[][] = [tabsData];
        let currentChildren = tabsData;

        let currentTab: Tab | undefined

        for (const _ of activePath.split(".")) {
            currentTab = currentChildren.find(tab =>
                activePath.startsWith(tab.id)
            );

            if (currentTab) {
                result.push(currentTab.children || []);
                currentChildren = currentTab.children || [];
            } else {
                break;
            }
        }

        let updatedPath = activatePath(tabsData, activePath)

        setTabStore({
            tabsData: updatedPath,
            visibleTabs: result,
            activeTab: currentTab,
            activePath: activePath,
        });
    }

    const handleTabClick = (tab: Tab) => {

        if (!tab.content && tab.children) {
            let newTab = findContentInTab(tab.children)
            if (newTab) {
                tab = newTab
            }
        }
        UpdateQueryParam(props.id, tab.id);

        updateContent();

        props.onTabChange?.(tab.id);
    };

    return (
        <div class={CssNAV.TabsContainer} style={props.styles?.tabContainer}>
            <Show when={props.showTreeView}>
                <Treeview nested
                    activePath={tabStore.activePath}
                    tabsData={tabStore.tabsData}
                    onClick={handleTabClick} />
            </Show>

            <Show when={props.showPathTabs}>
                <LevelTabs
                    tabs={tabStore.visibleTabs}
                    activePath={tabStore.activePath}
                    handleTabClick={handleTabClick}
                    buttonStyle={props.styles?.button}
                    tabLevelStyle={props.styles?.tabLevel}
                    tabLevelsStyle={props.styles?.tabLevels}
                />
            </Show>

            <Show when={props.showContent && tabStore.activeTab?.content}>
                <div class={CssNAV.TabContent} style={props.styles?.content}>
                    {tabStore.activeTab.content}
                </div>
            </Show>
        </div>
    );
}

function convertTree(tree: Tab[], parentId: string = ''): Tab[] {
    return tree.map(tab => {
        // Create a new node with the updated ID
        const newTab: Tab = {
            ...tab,
            id: parentId ? `${parentId}.${tab.id}` : tab.id, // Append parent's ID with a dot
            open: tab.open || false // Initialize open to false if not defined
        };

        // If the node has children, recursively convert them
        if (tab.children && tab.children.length > 0) {
            newTab.children = convertTree(tab.children, newTab.id);
            // Set open to true if any child is open
            newTab.open = newTab.open || newTab.children.some(child => child.open);
        }

        return newTab;
    });
}

function activatePath(tree: Tab[], activePath: string): Tab[] {
    return tree.map(tab => {
        const newTab = { ...tab };

        if (activePath == newTab.id) {
            newTab.open = !newTab.open;
        } else if (activePath.startsWith(newTab.id)) {
            newTab.open = true;
        }

        if (newTab.children) {
            newTab.children = activatePath(newTab.children, activePath);
        }

        return newTab;
    });
}

function findContentInTab(tabs: Tab[]): Tab | null {
    const queue: Tab[] = [...tabs]; // Initialize the queue with the initial tabs

    while (queue.length > 0) {
        const currentTab = queue.shift(); // Dequeue the first tab

        // Check if the current tab has content
        if (currentTab?.content) {
            return currentTab; // Return the tab if it has content
        }

        // If no content, enqueue the children
        if (currentTab?.children) {
            queue.push(...currentTab.children); // Add children to the queue
        }
    }

    return null; // Return null if no content is found
}
