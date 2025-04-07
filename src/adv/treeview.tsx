import { For, Show, createSignal } from 'solid-js';

/* CSS:
.tree-view {
    display: inline-flex;
    padding: 0.5rem;
    user-select: none;
    background: #565656;
}

.tree-view.horizontal {
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
}

.tree-item {
    display: flex;
    padding: 0.25rem;
    cursor: pointer;
}

.tree-item.vertical {
    flex-direction: column;
    background: #ff6767;
}

.tree-item.horizontal {
    flex-direction: row;
    align-items: center;
    background: #9fdf4a;
}

.tree-item:hover {
    background: white;
}

.tree-item-content {
    display: flex;
    align-items: center;
    // gap: 0.5rem;
    background: #7878e7;

    span {
        background: #6d44ae;
        padding: 0.25rem;
    }
}

.tree-toggle {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;
}

.tree-toggle.open.vertical {
    transform: rotate(90deg);
}

.tree-toggle.open.horizontal {
    transform: rotate(180deg);
}

.tree-children.vertical {
    margin-left: 1rem;
    background: yellow;
    padding: 0.2rem;
}

.tree-children.horizontal {
    margin-top: 0rem;
    background: #f37878;
    padding: 0.2rem;
}
*/


type TreeNode = {
    id: string;
    label: string;
    children?: TreeNode[];
};

type TreeItemProps = {
    node: TreeNode;
    level?: number;
    direction?: 'horizontal' | 'vertical';
    expandedIds: Set<string>;
    onToggle: (id: string) => void;
    defaultExpanded?: boolean;
    onLeafClick?: (node: TreeNode) => void;
};

type TreeviewProps = {
    direction?: 'horizontal' | 'vertical';
    data?: TreeNode[];
    defaultExpanded?: boolean;
    onLeafClick?: (node: TreeNode) => void;
};

const TreeItem = (props: TreeItemProps) => {
    const hasChildren = () => props.node.children && props.node.children.length > 0;
    const direction = () => props.direction || 'vertical';
    const isExpanded = () => props.expandedIds.has(props.node.id);

    // const toggleExpand = (e: MouseEvent) => {
    //     e.stopPropagation();
    //     props.onToggle(props.node.id);
    // };

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        if (hasChildren()) {
            props.onToggle(props.node.id);
        } else if (props.onLeafClick) {
            props.onLeafClick(props.node);
        }
    };

    return (
        <div class={`tree-item ${direction()}`} onClick={handleClick}>
            <div
                class="tree-item-content"
                style={{
                    [direction() === 'vertical' ? "padding-left" : "padding-top"]:
                        `${(props.level || 0) * 0}rem`
                }}
            >
                <Show when={hasChildren()}>
                    <div class={`tree-toggle ${isExpanded() ? 'open' : ''} ${direction()}`}>
                        {direction() === 'vertical' ? '+' : '-'}
                    </div>
                </Show>
                <span>{props.node.label}</span>
            </div>
            <Show when={isExpanded() && hasChildren()}>
                <div class={`tree-children ${direction()}`}>
                    <For each={props.node.children}>
                        {(child) => (
                            <TreeItem
                                {...props}
                                node={child}
                                level={(props.level || 0) + 1}
                            />
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};

export function Treeview(props: TreeviewProps) {
    const direction = () => props.direction || 'vertical';

    // Create a Set to track expanded node IDs
    const [expandedIds, setExpandedIds] = createSignal<Set<string>>(new Set());

    // Initialize expanded state if defaultExpanded is true
    const initializeExpanded = () => {
        if (props.defaultExpanded) {
            const ids = new Set<string>();
            const addIds = (nodes: TreeNode[]) => {
                for (const node of nodes) {
                    ids.add(node.id);
                    if (node.children) {
                        addIds(node.children);
                    }
                }
            };
            addIds(props.data);
            setExpandedIds(ids);
        }
    };

    // Run initialization once
    initializeExpanded();

    // Toggle handler
    const handleToggle = (id: string) => {
        const newIds = new Set(expandedIds());
        if (newIds.has(id)) {
            newIds.delete(id);
        } else {
            newIds.add(id);
        }
        setExpandedIds(newIds);
    };

    return (
        <div class={`tree-view ${direction()}`}>
            <For each={props.data}>
                {(node) => (
                    <TreeItem
                        node={node}
                        direction={direction()}
                        expandedIds={expandedIds()}
                        onToggle={handleToggle}
                        defaultExpanded={props.defaultExpanded}
                        onLeafClick={props.onLeafClick}
                    />
                )}
            </For>
        </div>
    );
}
