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
                class={CssNAV.TreeItemHeader}
            >
                <Show when={hasChildren}>
                    <div class={`${CssNAV.TreeToggle} ${isExpanded ? 'open' : ''} ${direction}`}>
                        {isExpanded ? '+' : '-'}
                    </div>
                </Show>
                <span>{props.node.label}</span>
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
                    />
                )}
            </For>
        </div>
    );
}

type TabsProps = {
    id: string;
    tabs: Tab[];

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

    const [tabs, setTabs] = createSignal(convertTree(props.tabs));

    const getCurrentPath = () => {
        const states = ParseUrlParams();
        return (states[props.id] || tabs()[0]?.id).split(".")
    };

    const [visibleTabs, setVisibleTabs] = createSignal<Tab[][]>([tabs()]);
    const [tabContent, setTabContent] = createSignal<JSX.Element | undefined>();

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

        let path = getCurrentPath()

        let content: JSX.Element | undefined;
        let allTabs = tabs();

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

        if (leaf) path.push(leaf)

        setTabContent(content);
        setVisibleTabs(findTabsByPath(tabs(), path));
    }

    const handleTabClick = (tab: Tab, level: number) => {
        UpdateQueryParam(props.id, tab.id);

        updateContent();

        props.onTabChange?.(tab.id);
    };

    return (
        <div class={CssNAV.TabsContainer} style={props.styles?.tabContainer}>
            <Show when={props.showTreeView}>
                <Treeview
                    direction="vertical"
                    tabs={tabs()}
                    onClick={(node) => {
                        console.log("Leaf clicked:", node);
                    }} />
            </Show>
            <Show when={props.showPathTabs}>
                <div class={CssNAV.TabsLevels} style={props.styles?.tabLevels}>
                    <For each={visibleTabs()}>
                        {(levelTabs, level) => (
                            <div class={CssNAV.TabLevel}
                                style={{
                                    ...props.styles?.tabLevel,
                                    // "padding-left": `${level() * 1}rem`
                                }}>
                                <For each={levelTabs}>
                                    {(tab) => (
                                        <button
                                            class={`${getCurrentPath()[level()] === tab.id ? CssUI.MaterialButton : CssUI.OutlinedButton}`}
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
            </Show>

            <Show when={props.showContent}>
                <div class={CssNAV.TabContent} style={props.styles?.content}>
                    {tabContent()}
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
