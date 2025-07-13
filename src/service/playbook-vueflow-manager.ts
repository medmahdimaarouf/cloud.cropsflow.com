import { ActionNode, ContextNode, PipeNode, PlaybookNode } from '@/models';
import { GraphNode, Node, useNode, VueFlowStore, XYPosition } from '@vue-flow/core';

abstract class ViewFlowNode<T extends PlaybookNode = never> {
    protected readonly playbookNode: T;
    public get id(): string {
        return this.playbookNode.id;
    }
    private get vueNode(): GraphNode {
        return useNode(this.playbookNode.id).node;
    }

    public get dimensions() {
        return useNode(this.playbookNode.id).node.dimensions;
    }

    private get parentVueNode(): GraphNode | undefined {
        return useNode(this.playbookNode.id).parentNode?.value;
    }
    constructor(
        playbookNode: T,
        protected vueFlowStore: VueFlowStore
    ) {
        this.playbookNode = Object.freeze(playbookNode);
    }

    public abstract attach(parent?: Node): Node;

    public abstract unattach(): Node;

    public position(position?: Partial<XYPosition>): XYPosition {
        if (position) {
            const vueNode = this.vueNode;
            this.vueFlowStore.updateNode(this.playbookNode.id, {
                position: {
                    x: position.x || vueNode.position.x,
                    y: position.y || vueNode.position.y
                }
            });
        }
        return this.vueNode.computedPosition;
    }
}
export class PlaybookContextViewFlowNode extends ViewFlowNode<ContextNode> {
    children: Array<ViewFlowNode<any>> = new Array();
    public static getInstance(node: ContextNode, vueFlow: VueFlowStore): PlaybookContextViewFlowNode {
        return new PlaybookContextViewFlowNode(node, vueFlow);
    }
    appendChild(playbookNode: PlaybookNode) {
        this.children.push(PlaybookViewFlowManager.createNode(playbookNode, this.vueFlowStore));
    }

    insertChild(before: string | PlaybookNode, after: string | PlaybookNode, node: PlaybookNode) {}

    removeChild(node: PlaybookNode) {}
    addHead() {
        const HEAD_NODE: Node = {
            id: `${this.id}-head`,
            parentNode: this.id,
            type: 'context-head',
            position: {
                x: 0, //node.position.x,
                y: 0 //node.position.y
            },
            data: this.playbookNode,
            draggable: false,
            selectable: false,
            expandParent: true,
            width: this.dimensions.width,
            height: 60,
            style: {
                display: 'flex',
                alignContent: 'center',
                flex: '1',
                flexGrow: 1,
                padding: '8px',
                marginRight: '8px',
                backgroundColor: '#ffff',
                borderRadius: '2px',
                border: '1px solid #e0e0e0'
            }
        };

        this.vueFlowStore.addNodes([HEAD_NODE]);

        return HEAD_NODE;
    }
    public attach(parent?: Node): Node {
        const ACTION_CONTEXT_NODE: Node = {
            id: this.playbookNode.id,
            type: 'context',
            position: {
                x: 50,
                y: 120
            },
            data: this.playbookNode,
            draggable: false,
            selectable: true,
            height: 180,
            width: 380,
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                justifyItems: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: ' 2px',
                backgroundColor: '#ffff',
                margin: '0px',
                padding: '0px',
                zIndex: -1
            }
        };
        this.vueFlowStore.addNodes([ACTION_CONTEXT_NODE]);
        return ACTION_CONTEXT_NODE;
    }
    public unattach(): Node {
        throw new Error('Method not implemented.');
    }
}

export class PlaybookActionViewFlowNode extends ViewFlowNode<ContextNode> {
    public attach(parent?: Node): Node {
        throw new Error('Method not implemented.');
    }
    public unattach(): Node {
        throw new Error('Method not implemented.');
    }
    public static getInstance(node: ContextNode, vueFlow: VueFlowStore): PlaybookActionViewFlowNode {
        return new PlaybookActionViewFlowNode(node, vueFlow);
    }
}

export class PlaybookPipeViewFlowNode extends ViewFlowNode<ContextNode> {
    public attach(parent?: Node): Node {
        throw new Error('Method not implemented.');
    }
    public unattach(): Node {
        throw new Error('Method not implemented.');
    }
    public static getInstance(node: ContextNode, vueFlow: VueFlowStore): PlaybookPipeViewFlowNode {
        return new PlaybookPipeViewFlowNode(node, vueFlow);
    }
}

export class PlaybookViewFlowManager {
    constructor(
        private playbook: any,
        private vueFlowStore: VueFlowStore
    ) {}

    public static createNode(node: PlaybookNode, vueFlowStore: VueFlowStore): ViewFlowNode<any> {
        if (node instanceof ContextNode) {
            return PlaybookContextViewFlowNode.getInstance(node, vueFlowStore);
        } else if (node instanceof ActionNode) {
            return PlaybookActionViewFlowNode.getInstance(node, vueFlowStore);
        } else if (node instanceof PipeNode) {
            return PlaybookPipeViewFlowNode.getInstance(node, vueFlowStore);
        } else throw Error('Unknown node type ');
    }
}
