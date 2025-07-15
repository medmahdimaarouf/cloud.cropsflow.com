export interface IPlaybookNode {
    id: string;
    selector: string;
    name: string;
    icon?: string;
    className: string;
}

export abstract class PlaybookNode implements IPlaybookNode {
    id: string;
    parent?: IPlaybookNode;
    selector: string;
    name: string;
    icon?: string;
    className: string;

    constructor(other?: IPlaybookNode, parent?: PlaybookNode) {
        this.parent = parent;
        this.id = other?.id || Date.now().toString();
        this.selector = other?.selector || '';
        this.name = other?.name || '';
        this.icon = other?.icon;
        this.className = other?.className || '';
    }
}

export class ActionNode extends PlaybookNode {}

export class ContextNode extends PlaybookNode {
    resolvedContext?: boolean;
    constructor(node: PlaybookNode & { resolvedContext?: boolean }, parent?: PlaybookNode) {
        super(node, parent);
        this.resolvedContext = node.resolvedContext;
    }
    public children: PlaybookNode[] = [];
    public append(child: PlaybookNode): PlaybookNode {
        child.parent = this;
        this.children.push(child);
        return this;
    }
}

export class PipeNode extends PlaybookNode {}
