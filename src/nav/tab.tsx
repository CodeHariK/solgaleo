import { For, createSignal, JSX, onMount, onCleanup, Show } from 'solid-js';
import { CssNAV, ParseUrlParams, UpdateQueryParam } from './gen';
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

/*CSS:-
.TreeView {
    display: inline-flex;
    padding: 0.5rem;
    user-select: none;
    background: #565656;
    flex-direction: column;
}
.TreeView.horizontal {
    align-items: flex-start;
    flex-direction: row;
    gap: 1rem;
}

.TreeItem {
    display: flex;
    padding: 0.25rem;
    cursor: pointer;
}
.TreeItem.vertical {
    flex-direction: column;
    background: #ff6767;
}
.TreeItem.horizontal {
    flex-direction: row;
    align-items: center;
    background: #9fdf4a;
}
.TreeItem:hover {
    background: white;
}

.TreeItemHeader {
    display: flex;
    align-items: center;
    // gap: 0.5rem;
    background: #7878e7;

    span {
        background: #6d44ae;
        padding: 0.25rem;
    }
}
.TreeToggle {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;
}
.TreeToggle.open {
    transform: rotate(90deg);
}

.TreeChildren.vertical {
    padding-left: 1rem;
    border: 1px solid black;
}
.TreeChildren.horizontal {
    border: 1px solid black;
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
    node: Tab;
    activePath?: string;
    direction?: 'horizontal' | 'vertical';
    onClick?: (node: Tab) => void;
};

const TreeItem = (props: TreeItemProps) => {
    const hasChildren = props.node.children && props.node.children.length > 0;
    const direction = props.direction || 'vertical';
    const isExpanded = props.node.open;

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        props.onClick(props.node);
    };

    return (
        <div class={`${CssNAV.TreeItem} ${direction}`} onClick={handleClick}>
            <div
                class={`${CssNAV.TreeItemHeader}`}
                style={{
                    background: props.activePath?.startsWith(props.node.id) ? "yellow" : ""
                }}
            >
                <Show when={hasChildren}>
                    <div class={`${CssNAV.TreeToggle} ${isExpanded ? 'open' : ''} ${direction}`}>
                        {isExpanded ? '+' : '-'}
                    </div>
                </Show>
                {/* <span>{props.node.label}</span> */}
                <span>{props.node.id}</span>
            </div>
            <Show when={isExpanded && hasChildren}>
                <div class={`${CssNAV.TreeChildren} ${direction}`}>
                    <For each={props.node.children}>
                        {(child) => (
                            <TreeItem
                                {...props}
                                node={child}
                            />
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};

type TreeviewProps = {
    direction?: 'horizontal' | 'vertical';
    tabs: Tab[];
    activePath?: string;
    onClick?: (node: Tab) => void;
};

export function Treeview(props: TreeviewProps) {
    const direction = props.direction || 'vertical';

    const [tabs, setTabs] = createSignal(convertTree(props.tabs));

    const handleToggle = (node: Tab) => {
        let newData = toggleNodeOpenById(tabs(), node.id)
        setTabs(newData)
        props.onClick(node)
    };

    return (
        <div class={`${CssNAV.TreeView} ${direction}`}>
            <For each={tabs()}>
                {(node) => (
                    <TreeItem
                        node={node}
                        direction={direction}
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
}
) {
    return <div class={CssNAV.TabsLevels} style={props.tabLevelsStyle}>
        <For each={props.tabs}>
            {(levelTabs) => (
                <div class={CssNAV.TabLevel}
                    style={{
                        ...props.tabLevelStyle,
                        // "padding-left": `${level() * 1}rem`
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

    const getCurrentPath = () => {
        const states = ParseUrlParams();
        return (states[props.id] || tabsData()[0]?.id).split(".")
    };

    const [tabsData, setTabsData] = createSignal(convertTree(props.tabsData));
    const [visibleTabs, setVisibleTabs] = createSignal<{ visibleTabs: Tab[][], activeTab: Tab }>();

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

        const result: Tab[][] = [tabsData()];
        let currentChildren = tabsData();
        let currentPathId = '';

        let currentTab: Tab | undefined

        for (const originalId of getCurrentPath()) {
            currentPathId = currentPathId ? `${currentPathId}.${originalId}` : originalId;

            currentTab = currentChildren.find(t => t.id.startsWith(currentPathId));

            if (currentTab) {
                result.push(currentTab.children || []); // Push children if they exist
                currentChildren = currentTab.children || []; // Update current to the children or empty array
            } else {
                break; // If the tab is not found, exit the loop
            }
        }

        setVisibleTabs()
        setVisibleTabs({
            visibleTabs: result,
            activeTab: currentTab,
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
                <Treeview
                    direction="vertical"
                    activePath={getCurrentPath().join(".")}
                    tabs={tabsData()}
                    onClick={(node) => {
                        console.log("clicked:", node);
                    }} />
            </Show>

            <Show when={props.showPathTabs}>
                <LevelTabs
                    tabs={visibleTabs()?.visibleTabs}
                    activePath={getCurrentPath().join(".")}
                    handleTabClick={handleTabClick}
                    buttonStyle={props.styles.button}
                    tabLevelStyle={props.styles.tabLevel}
                    tabLevelsStyle={props.styles.tabLevels}
                />
            </Show>

            <Show when={props.showContent}>
                <div class={CssNAV.TabContent} style={props.styles?.content}>
                    {visibleTabs()?.activeTab.content}
                </div>
            </Show>
        </div>
    );
}

function convertTree(tree: Tab[], parentId: string = ''): Tab[] {
    return tree.map(node => {
        // Create a new node with the updated ID
        const newNode: Tab = {
            ...node,
            id: parentId ? `${parentId}.${node.id}` : node.id, // Append parent's ID with a dot
            open: node.open || false // Initialize open to false if not defined
        };

        // If the node has children, recursively convert them
        if (node.children && node.children.length > 0) {
            newNode.children = convertTree(node.children, newNode.id);
            // Set open to true if any child is open
            newNode.open = newNode.open || newNode.children.some(child => child.open);
        }

        return newNode;
    });
}

function findNodeById(tree: Tab[], dottedId: string): Tab | null {
    for (const node of tree) {
        // Check if the current node's ID matches the dotted ID
        if (node.id === dottedId) {
            return node; // Return the found node
        }

        // If the node has children, search recursively
        if (node.children) {
            const foundNode = findNodeById(node.children, dottedId);
            if (foundNode) {
                return foundNode; // Return the found node from children
            }
        }
    }
    return null; // Return null if the node was not found
}

function toggleNodeOpenById(tree: Tab[], dottedId: string): Tab[] {
    return tree.map(node => {
        const newNode = { ...node }; // Create a new node to avoid mutation

        if (newNode.id === dottedId) {
            newNode.open = !newNode.open; // Toggle the open property
        }

        if (newNode.children) {
            newNode.children = toggleNodeOpenById(newNode.children, dottedId); // Recursively toggle children
        }

        return newNode; // Return the new node
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
