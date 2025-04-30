import { For, createSignal, JSX, Show } from 'solid-js';
import { CssNAV, UpdateQueryParam } from './gen';
import { useRoutes } from './useRoutes';

/*CSS:*
.TreeView {

    list-style: none;
    margin: 0;
    padding: 0;

    display: inline-flex;
    flex-direction: column;
    user-select: none;
}
.TreeItem {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    margin: 0;
    padding-left: 1rem;
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
    // border: 1px solid var(--secondary-container);
}
.TreeHeader:hover {
    color: var(--secondary);
    background: var(--secondary-container);
}
.TreeActive {
    background: var(--primary-container);
    color: var(--primary);
}

.TreeToggle {
    padding: 0rem .3rem;
    transition: all .3s ease;
}
.TreeToggleOpen {
    transform: rotate(180deg);
}

.TreeContent {
    max-height: 0;
    overflow: hidden;
    transition: all 0.2s ease-out;
    opacity: 0;
}
*/

type Tree = {
    id: string
    label: string
    content?: JSX.Element
    children?: Tree[]
    open?: boolean
};

export function TreeView(props: {
    id: string;
    activePath?: string;
    data: Tree[];
    level?: number;
    onClick?: (tab: Tree) => void;
    style?: JSX.CSSProperties;
}) {

    const [_] = useRoutes(props.id, updateContent);
    const [tree, setTree] = createSignal(props.level ? props.data : convertTree(props.data));
    const [activePath, setActivePath] = createSignal<string>(props.activePath);

    function updateContent(route?: string) {
        let activePath = (route || tree()[0]?.id) ?? "";
        setActivePath(activePath);
    }

    const handleToggle = (treeItem: Tree, e: MouseEvent) => {

        e.stopPropagation();

        let newData = activatePath(tree(), treeItem.id);
        setTree(newData);

        if (!treeItem.content && treeItem.children) {
            let newTab = findContentInTree(treeItem.children);
            if (newTab) treeItem = newTab;
        }

        UpdateQueryParam(props.id, treeItem.id);
        props.onClick?.(treeItem);
    };

    console.log(tree())

    return (
        <ul
            class={CssNAV.TreeView}
            style={props.style}
            role="tree"
        >
            <For each={tree()}>
                {(tab) => (
                    <li class={CssNAV.TreeItem}>
                        <div
                            class={CssNAV.TreeHeader}
                            classList={{ [CssNAV.TreeActive]: activePath()?.startsWith(tab.id) }}
                            onClick={(e) => handleToggle(tab, e)}
                        >
                            <div class={`${CssNAV.TreeToggle} ${activePath()?.startsWith(tab.id) ? CssNAV.TreeToggleOpen : ''}`}
                            >
                                {tab.children?.length ? (tab.open ? '-' : '+') : ''}
                            </div>
                            <div style={{ display: "flex", "flex-direction": "column" }}>

                                <span>{tab.label}</span>

                                <Show when={tab.open && tab.content && activePath()?.startsWith(tab.id)}>
                                    <div
                                        class={CssNAV.TreeContent}
                                        style={{
                                            "max-height": "40vh",
                                            "overflow-y": "scroll",
                                            opacity: 1
                                        }}
                                    >
                                        {tab.content}
                                    </div>
                                </Show>
                            </div>
                        </div>

                        <Show when={tab.open && tab.children?.length}>
                            <TreeView
                                id={props.id}
                                data={tab.children}
                                onClick={props.onClick}
                                activePath={activePath()}
                                level={(props.level ?? 0) + 1}
                            />
                        </Show>
                    </li>
                )}
            </For>
        </ul>
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
    tabsData: Tree[];
    onClick?: (tab: Tree) => void;

    tabLevelsStyle?: JSX.CSSProperties,
    tabLevelStyle?: JSX.CSSProperties,
    buttonStyle?: JSX.CSSProperties,
}) {

    const [_] = useRoutes(props.id, updateContent)
    const [tabTree, __] = createSignal(convertTree(props.tabsData));
    const [activeItem, setActiveItem] = createSignal(null);
    const [leveledTree, setLeveledTree] = createSignal<Tree[][]>([]);

    const isActive = (tab: Tree) => activeItem()?.id?.startsWith(tab.id)

    const handleToggle = (tab: Tree) => {
        UpdateQueryParam(props.id, tab.id);
        props.onClick?.(tab)
    };

    function updateContent(route?: string) {
        let activePath = (route || tabTree()[0]?.id) ?? ""
        let tabById = getTreeItemById(tabTree(), activePath);
        setActiveItem(tabById.currentItem)
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

export function TreeContent(props: {
    id: string;
    data: Tree[];
    contentStyle?: JSX.CSSProperties;
}) {
    const [_] = useRoutes(props.id, updateContent)
    const [tabTree] = createSignal(convertTree(props.data))
    const [activeItem, setActiveItem] = createSignal<Tree>(null);

    function updateContent(route?: string) {
        let activePath = (route || tabTree()[0]?.id) ?? ""
        let result = getTreeItemById(tabTree(), activePath);
        setActiveItem(result.currentItem)
    }

    return <div class={CssNAV.TabContent} style={props?.contentStyle}>
        {activeItem()?.content}
    </div>
}

function convertTree(treeArray: Tree[], parentId: string = ''): Tree[] {
    return treeArray.map(tree => {
        // Create a new node with the updated ID
        const newTree: Tree = {
            ...tree,
            id: parentId ? `${parentId}.${tree.id}` : tree.id, // Append parent's ID with a dot
            open: tree.open || false // Initialize open to false if not defined
        };

        // If the node has children, recursively convert them
        if (tree.children && tree.children.length > 0) {
            newTree.children = convertTree(tree.children, newTree.id);
            // Set open to true if any child is open
            newTree.open = newTree.open || newTree.children.some(child => child.open);
        }

        return newTree;
    });
}

function activatePath(tree: Tree[], activePath: string): Tree[] {
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

function findContentInTree(tree: Tree[]): Tree | null {
    const queue: Tree[] = [...tree]; // Initialize the queue with the initial tabs

    while (queue.length > 0) {
        const current = queue.shift(); // Dequeue the first tab

        // Check if the current tab has content
        if (current?.content) {
            return current; // Return the tab if it has content
        }

        // If no content, enqueue the children
        if (current?.children) {
            queue.push(...current.children); // Add children to the queue
        }
    }

    return null; // Return null if no content is found
}

function getTreeItemById(tree: Tree[], activePath: string) {
    const leveledTree: Tree[][] = [tree];
    let currentChildren = tree;

    let currentItem: Tree | undefined;

    for (const _ of activePath.split(".")) {
        currentItem = currentChildren.find(tab => activePath.startsWith(tab.id)
        );

        if (currentItem) {
            leveledTree.push(currentItem.children || []);
            currentChildren = currentItem.children || [];
        } else {
            break;
        }
    }
    return { leveledTree, currentItem };
}
