import { ActionNode, ContextNode, PipeNode, PlaybookNode } from '@/models';
import { Dimensions, Edge, GraphNode, Node, useNode, VueFlowStore, XYPosition } from '@vue-flow/core';

abstract class ViewFlowNode<T extends PlaybookNode = any> {
    protected readonly playbookNode: T;
    protected _next: ViewFlowNode | undefined;
    protected _vueNode!: GraphNode;

    public get id(): string {
        return this.playbookNode.id;
    }
    public get vueNode(): GraphNode {
        if (!this._vueNode) this._vueNode = useNode(this.id).node;
        return this._vueNode;
    }
    constructor(
        playbookNode: T,
        protected vueFlowStore: VueFlowStore,
        public parent?: ViewFlowNode<any>
    ) {
        this.playbookNode = Object.freeze(playbookNode);
    }
    public dimensions(dimensions?: Partial<Dimensions>) {
        if (dimensions) {
            this.vueNode.dimensions = { width: dimensions.width || this.vueNode.dimensions.width, height: dimensions.height || this.vueNode.dimensions.height };
        }
        return this.vueNode.dimensions;
    }
    public position(position?: Partial<XYPosition>): XYPosition {
        if (position) {
            this.vueNode.position = {
                x: position.x || this.vueNode.position.x,
                y: position.y || this.vueNode.position.y
            };
        }
        return this.vueNode.position;
    }
    private get parentVueNode(): GraphNode | undefined {
        return useNode(this.playbookNode.id).parentNode?.value;
    }
    public getNext(): ViewFlowNode | undefined {
        return this._next;
    }
    public abstract draw(positon: XYPosition): Node;

    public abstract undraw(): Node;
    public abstract disconnectNext(): Edge;

    public setNext(next: ViewFlowNode): Edge {
        if (this._next) {
            this.vueFlowStore.removeEdges([`${this.id}|next|${this._next.id}`]);
        } else {
            this.__undrawNextPlaceholderNode();
        }
        this._next = next;
        const NEXT_EDGE: Edge = {
            id: `${this.id}|next|${this._next.id}`,
            source: this.id,
            target: this._next.id,
            type: 'straight'
        };
        this.vueFlowStore.addEdges([NEXT_EDGE]);

        return NEXT_EDGE;
    }

    protected __drawNextPlaceholderNode(): Node {
        const dimensions: Dimensions = this.dimensions();
        const NEXT_PLACEHOLDER: Node = {
            id: `${this.id}|next-placeholder`,
            type: 'placeholder',
            position: {
                x: dimensions.width / 2 - 10,
                y: dimensions.height + 20
            },
            parentNode: this.id,
            draggable: false,
            selectable: false,
            expandParent: false
        };
        this.vueFlowStore.addNodes([NEXT_PLACEHOLDER]);
        this.vueFlowStore.addEdges([
            {
                id: `${this.id}|${NEXT_PLACEHOLDER.id}`,
                source: this.id,
                target: NEXT_PLACEHOLDER.id,
                sourceHandle: `${this.id}-next`,
                targetHandle: `${NEXT_PLACEHOLDER.id}-previous`
            }
        ]);

        return NEXT_PLACEHOLDER;
    }

    protected __undrawNextPlaceholderNode(): void {
        const next_placeholder_node_id: string = `${this.id}|next-placeholder`;
        this.vueFlowStore.removeNodes([next_placeholder_node_id]);
        this.vueFlowStore.removeEdges([`${this.id}|${next_placeholder_node_id}`]);
    }
}
export class PlaybookContextViewFlowNode extends ViewFlowNode<ContextNode> {
    children: Array<ViewFlowNode<any>> = new Array();
    public static getInstance(node: ContextNode, vueFlow: VueFlowStore, parent?: ViewFlowNode<any>): PlaybookContextViewFlowNode {
        return new PlaybookContextViewFlowNode(node, vueFlow, parent);
    }

    lastChild(): ViewFlowNode<any> | undefined {
        return this.children.at(this.children.length - 1);
    }
    addNode(node: PlaybookNode): ViewFlowNode<any> {
        const child = PlaybookViewFlowManager.createNode(node, this.vueFlowStore, this);
        const previous: ViewFlowNode<any> | undefined = this.lastChild();
        if (previous) {
            const previousPosition: XYPosition = previous.position();
            const previousDimensions: Dimensions = previous.dimensions();
            child.draw({
                x: previousPosition.x + previousDimensions.width / 2,
                y: previousPosition.y + (previousDimensions.height + 100)
            });
            previous.setNext(child);
        } else {
            //previousNode.dimensions.height = 600;

            child.draw({
                x: this.position().x + this.dimensions().width / 2,
                y: this.position().y + (this.dimensions().height + 100)
            });
            this.vueFlowStore.addEdges([
                {
                    id: `${this.id}-head|${child.id}-next`,
                    target: child.id,
                    source: useNode(`${this.id}-head`).id
                }
            ]);
        }

        this.children.push(child);
        return child;
    }

    insertChild(before: string | PlaybookNode, after: string | PlaybookNode, node: PlaybookNode) {}

    removeChild(node: PlaybookNode) {}

    public draw(position: XYPosition): Node {
        const CONTAINER_NODE = this.__createContainerNode(position);
        this.vueFlowStore.addNodes([CONTAINER_NODE]);
        const CONTEXT_HEAD_NODE = this.__createHeadNode();
        this.vueFlowStore.addNodes([CONTEXT_HEAD_NODE]);
        this.__drawNextPlaceholderNode();
        this._vueNode = useNode(CONTAINER_NODE.id).node;
        return CONTAINER_NODE;
    }

    public disconnectNext(): Edge {
        throw new Error('Method not implemented.');
    }

    public undraw(): Node {
        throw new Error('Method not implemented.');
    }

    __createContainerNode(position: XYPosition): Node {
        return {
            id: this.playbookNode.id,
            type: 'context',
            parentNode: this.parent?.id,
            expandParent: !!this.parent,
            position: position,
            data: this.playbookNode,
            draggable: false,
            selectable: true,
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
    }

    __createHeadNode(): Node {
        return {
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
            width: this.dimensions().width,
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
    }
}

export class PlaybookActionViewFlowNode extends ViewFlowNode<ActionNode> {
    public static getInstance(node: ActionNode, vueFlow: VueFlowStore, parent?: ViewFlowNode<any>): PlaybookActionViewFlowNode {
        return new PlaybookActionViewFlowNode(node, vueFlow, parent);
    }

    public disconnectNext(): Edge {
        throw new Error('Method not implemented.');
    }

    public draw(position: XYPosition): Node {
        const CONTAINER_NODE = this.createContainerNode(position);
        this.vueFlowStore.addNodes(CONTAINER_NODE);
        this.__drawNextPlaceholderNode();
        this._vueNode = useNode(CONTAINER_NODE.id).node;
        return CONTAINER_NODE;
    }

    public undraw(): Node {
        throw new Error('Method not implemented.');
    }
    private createContainerNode(postion: XYPosition): Node {
        return {
            id: this.id,
            parentNode: this.parent?.id,
            expandParent: !!this.parent,
            width: 280,
            position: postion,
            type: 'action',
            data: this.playbookNode,
            style: {
                backgroundColor: '#ffff'
            }
        };
    }
}

export class PlaybookPipeViewFlowNode extends ViewFlowNode<PipeNode> {
    public setNext(next: ViewFlowNode): Edge {
        throw new Error('Method not implemented.');
    }
    public disconnectNext(): Edge {
        throw new Error('Method not implemented.');
    }
    public draw(position: XYPosition): Node {
        throw new Error('Method not implemented.');
    }
    public undraw(): Node {
        throw new Error('Method not implemented.');
    }
    public static getInstance(node: PipeNode, vueFlow: VueFlowStore, parent?: ViewFlowNode<any>): PlaybookPipeViewFlowNode {
        return new PlaybookPipeViewFlowNode(node, vueFlow, parent);
    }
}

export interface IPlaybook {
    id: string;
    title: string;
    icon?: string;
}

export class Playbook implements IPlaybook {
    id: string;
    title: string;
    icon?: string;
    constructor(data: IPlaybook) {
        this.id = data.id;
        this.title = data.title;
        this.icon = data.icon;
    }
}

export class PlaybookViewFlowManager {
    nodes: Array<ViewFlowNode<any>> = new Array();
    constructor(
        private playbook: any,
        private vueFlowStore: VueFlowStore
    ) {}

    public static createNode(node: PlaybookNode, vueFlowStore: VueFlowStore, parent?: ViewFlowNode<any>): ViewFlowNode<any> {
        if (node instanceof ContextNode) {
            return PlaybookContextViewFlowNode.getInstance(node, vueFlowStore, parent);
        } else if (node instanceof ActionNode) {
            return PlaybookActionViewFlowNode.getInstance(node, vueFlowStore, parent);
        } else if (node instanceof PipeNode) {
            return PlaybookPipeViewFlowNode.getInstance(node, vueFlowStore, parent);
        } else throw Error('Unknown node type ');
    }
    child(index: number): ViewFlowNode<any> | undefined {
        return this.nodes.at(index);
    }

    lastChild(): ViewFlowNode<any> | undefined {
        return this.nodes.at(this.nodes.length - 1);
    }

    firstChild(): ViewFlowNode<any> | undefined {
        return this.nodes.at(0);
    }
    addNode(node: PlaybookNode): ViewFlowNode<any> {
        const child = PlaybookViewFlowManager.createNode(node, this.vueFlowStore);

        const previous: ViewFlowNode<any> | undefined = this.lastChild();
        if (previous) {
            const previousDimensions: Dimensions = previous.dimensions();
            const previousPosition: XYPosition = previous.position();
            console.log(previousDimensions);
            const childPosition: XYPosition = {
                x: previousPosition.x + previousDimensions.width / 2,
                y: previousPosition.y + (previousDimensions.height + 100)
            };
            child.draw(childPosition);
            previous.setNext(child);
        } else {
            child.draw({ x: 0, y: 0 });
        }

        this.nodes.push(child);
        return child;
    }

    insertNode(node: PlaybookNode, i: number) {
        const viewFlowNode = PlaybookViewFlowManager.createNode(node, this.vueFlowStore);
        this.nodes.push(viewFlowNode);
        return viewFlowNode;
    }

    draw(): Node {
        const START: Node = this.__createStartNode();
        this.vueFlowStore.addNodes([START]);
        return START;
    }

    __createStartNode(): Node {
        return {
            id: 'start',
            type: 'start',
            position: {
                x: this.vueFlowStore.viewport.value.x / 2,
                y: 10
            },
            draggable: false,
            expandParent: true,
            selectable: false
        };
    }
}
