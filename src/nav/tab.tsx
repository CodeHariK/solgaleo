import { For, createSignal, JSX, Show } from 'solid-js';
import { CssNAV, UpdateQueryParam } from './gen';
import { useRoutes } from './useRoutes';
import { CssUI } from '../ui/gen';

/*CSS:*
.TreeView {
    display: inline-flex;
    flex-direction: column;
    padding: 0.5rem;
    user-select: none;
}
.TreeItem {
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.TreeHeader {
    // width: 8rem;
    overflow-x: clip;
    display: flex;
    align-items: center;
    // gap: 0.5rem;
    background: var(--surface);
    color: var(--primary);
    padding: 0.25rem;
    border: 1px solid var(--secondary-container);
}
.TreeHeader:hover {
    color: var(--secondary-container);
    background: var(--secondary);
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

const TreeItem = (props: {
    tab: Tab;
    showContent?: boolean;
    activePath?: string;
    onClick?: (tab: Tab) => void;
}) => {
    const hasChildren = props.tab.children && props.tab.children.length > 0;
    const isExpanded = () => props.tab.open
    const isActive = () => props.activePath?.startsWith(props.tab.id)

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        props.onClick?.(props.tab);
    };

    return (
        <div class={`${CssNAV.TreeItem}`} onClick={handleClick}>
            <div
                classList={{
                    [CssNAV.TreeHeader]: true,
                    [CssNAV.TreeActive]: isActive()
                }}
            >
                <div class={`${CssNAV.TreeToggle} ${(isActive()) ? CssNAV.TreeToggleOpen : ''}`}>
                    {hasChildren ? (isExpanded() ? '-' : '+') : ""}
                </div>
                <div style={{
                    display: "flex",
                    "flex-direction": "column"
                }}>
                    <span>{props.tab.label}</span>

                    <Show when={props.showContent}>
                        <div
                            class={CssUI.AccordionContent}
                            style={isActive() ? {
                                // ...props.contentStyle,
                                "max-height": "40vh",
                                "overflow-y": "scroll",
                                opacity: 1,
                            } : {}}
                        >
                            {props.tab.content}
                        </div>
                    </Show>


                </div>
            </div>

            <Show when={isExpanded() && hasChildren}>
                <div class={`${CssNAV.TreeChildren}`}>
                    <For each={props.tab.children}>
                        {(child) => (<TreeItem {...props} tab={child} />)}
                    </For>
                </div>
            </Show>
        </div>
    );
};

export function Treeview(props: {
    id: string;
    showContent?: boolean;
    tabsData: Tab[];
    onClick?: (tab: Tab) => void;
}) {

    const [_] = useRoutes(props.id, updateContent)
    const [tabTree, setTabTree] = createSignal(convertTree(props.tabsData));
    const [activeTab, setActiveTab] = createSignal(null);

    const handleToggle = (tab: Tab) => {
        let newData = activatePath(tabTree(), tab.id)
        setTabTree(newData)
        if (!tab.content && tab.children) {
            let newTab = findContentInTab(tab.children)
            if (newTab) {
                tab = newTab
            }
        }
        UpdateQueryParam(props.id, tab.id);
        props.onClick?.(tab)
    };

    function updateContent(route?: string) {
        let activePath = (route || tabTree()[0]?.id) ?? ""
        let tabById = getTabById(tabTree(), activePath);
        setActiveTab(tabById.currentTab)
    }

    return (
        <div class={`${CssNAV.TreeView}`}>
            <For each={tabTree()}>
                {(tab) => (
                    <TreeItem
                        tab={tab}
                        showContent={props.showContent}
                        onClick={handleToggle}
                        activePath={activeTab()?.id}
                    />
                )}
            </For>
        </div>
    );
}

/*CSS:*

.TabsLevels {
    display: flex;
    flex-direction: column;
}

.TabLevel {
    display: flex;
    flex-direction: row;
    align-self: start;
}

*/

export function LevelTabs(props: {
    id: string,
    tabsData: Tab[];
    onClick?: (tab: Tab) => void;

    tabLevelsStyle?: JSX.CSSProperties,
    tabLevelStyle?: JSX.CSSProperties,
    buttonStyle?: JSX.CSSProperties,
}) {

    const [_] = useRoutes(props.id, updateContent)
    const [tabTree, __] = createSignal(convertTree(props.tabsData));
    const [activeTab, setActiveTab] = createSignal(null);
    const [leveledTree, setLeveledTree] = createSignal<Tab[][]>([]);

    const isActive = (tab: Tab) => activeTab().id?.startsWith(tab.id)

    const handleToggle = (tab: Tab) => {
        UpdateQueryParam(props.id, tab.id);
        props.onClick?.(tab)
    };

    function updateContent(route?: string) {
        let activePath = (route || tabTree()[0]?.id) ?? ""
        let tabById = getTabById(tabTree(), activePath);
        setActiveTab(tabById.currentTab)
        setLeveledTree(tabById.leveledTree);
    }

    return <div class={CssNAV.TabsLevels} style={props.tabLevelsStyle}>
        <For each={leveledTree()}>
            {(levelTabs) => (
                <div class={CssNAV.TabLevel} style={{ ...props.tabLevelStyle, }}>
                    <For each={levelTabs}>
                        {(tab) => (

                            <div style={props.buttonStyle} onClick={() => handleToggle(tab)}
                                classList={{
                                    [CssNAV.TreeHeader]: true,
                                    [CssNAV.TreeActive]: isActive(tab)
                                }}
                            >
                                <div class={`${CssNAV.TreeToggle} ${(isActive(tab)) ? CssNAV.TreeToggleOpen : ''}`}>
                                    {isActive(tab) ? '-' : '+'}
                                </div>
                                <span>{tab.label}</span>
                            </div>

                        )}
                    </For>
                </div>
            )}
        </For>
    </div>;
}

/*CSS:*

.TabContent {
    flex: 1;
    overflow: auto;
}

*/

export function TabContent(props: {
    id: string;
    tabsData: Tab[];
    contentStyle?: JSX.CSSProperties;
}) {
    const [_] = useRoutes(props.id, updateContent)
    const [tabTree] = createSignal(convertTree(props.tabsData))
    const [activeTab, setActiveTab] = createSignal(null);

    function updateContent(route?: string) {
        let activePath = (route || tabTree()[0]?.id) ?? ""
        let tabById = getTabById(tabTree(), activePath);
        setActiveTab(tabById.currentTab)
    }

    return <div class={CssNAV.TabContent} style={props?.contentStyle}>
        {activeTab()?.content}
    </div>
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

function getTabById(tabTree: Tab[], activePath: string) {
    const leveledTree: Tab[][] = [tabTree];
    let currentChildren = tabTree;

    let currentTab: Tab | undefined;

    for (const _ of activePath.split(".")) {
        currentTab = currentChildren.find(tab => activePath.startsWith(tab.id)
        );

        if (currentTab) {
            leveledTree.push(currentTab.children || []);
            currentChildren = currentTab.children || [];
        } else {
            break;
        }
    }
    return { leveledTree, currentTab };
}
