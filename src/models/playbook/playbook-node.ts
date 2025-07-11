import type { Node } from '@vue-flow/core';

export interface IPlaybookNode {
    id: string;
    selector: string;
    name: string;
    icon?: string;
    className: string;
}

export abstract class PlaybookNode implements IPlaybookNode {
    protected parent?: PlaybookNode;
    protected node: Node;
    id: string;
    selector: string;
    name: string;
    icon?: string;
    className: string;

    public children: PlaybookNode[] = [];

    constructor(other?: IPlaybookNode, parent?: PlaybookNode) {
        this.parent = parent;
        this.id = other?.id || Date.now().toString();
        this.selector = other?.selector || '';
        this.name = other?.name || '';
        this.icon = other?.icon;
        this.className = other?.className || '';
        this.node = this.buildNode();
    }

    protected abstract buildNode(): Node;

    protected buildData(): Record<string, any> {
        return {
            name: this.name,
            icon: this.icon,
            selector: this.selector
        };
    }

    public append(child: PlaybookNode): PlaybookNode {
        child.parent = this;
        this.children.push(child);
        child.node = child.buildNode();
        return this;
    }

    public toVueNode(): Node {
        return this.node;
    }

    public getAllNodes(): Node[] {
        return [this.node, ...this.children.flatMap((c) => c.getAllNodes())];
    }
}

export class ActionNode extends PlaybookNode {
    protected buildNode(): Node {
        return {
            id: this.id,
            type: 'action',
            position: { x: 0, y: 0 },
            parentNode: this.parent?.id,
            data: this.buildData(),
            draggable: true,
            class: ['flow-node', 'action'],
            expandParent: true
        };
    }
}

export class ContextNode extends PlaybookNode {
    protected buildNode(): Node {
        return {
            id: this.id,
            type: 'context',
            position: { x: 0, y: 0 },
            parentNode: this.parent?.id,
            data: this.buildData(),
            draggable: true,
            class: ['flow-node', 'action-context'],
            expandParent: true
        };
    }

    protected buildData(): Record<string, any> {
        return {
            ...super.buildData(),
            contextType: 'http' // extra field for context nodes
        };
    }
}
