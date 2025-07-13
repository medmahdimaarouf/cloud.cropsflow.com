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

    public children: PlaybookNode[] = [];

    constructor(other?: IPlaybookNode, parent?: PlaybookNode) {
        this.parent = parent;
        this.id = other?.id || Date.now().toString();
        this.selector = other?.selector || '';
        this.name = other?.name || '';
        this.icon = other?.icon;
        this.className = other?.className || '';
    }

    public append(child: PlaybookNode): PlaybookNode {
        child.parent = this;
        this.children.push(child);
        return this;
    }
}

export class ActionNode extends PlaybookNode {}

export class ContextNode extends PlaybookNode {}

export class PipeNode extends PlaybookNode {}
