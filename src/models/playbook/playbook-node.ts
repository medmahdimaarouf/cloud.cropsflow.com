export interface IPlaybookNode {
    id: string;
    selector: string;
    name: string;
    icon?: string;
    className: string;
    context?: PlaybookContext;
}

export abstract class PlaybookNode implements IPlaybookNode {
    readonly id: string;
    readonly selector: string;
    readonly className: string;
    context?: PlaybookContext;
    name: string;
    icon?: string;

    constructor(other?: IPlaybookNode, context?: PlaybookContext) {
        this.context = context;
        this.id = other?.id || Date.now().toString();
        this.selector = other?.selector || '';
        this.name = other?.name || '';
        this.icon = other?.icon;
        this.className = other?.className || '';
    }
}

export class PlaybookAction extends PlaybookNode {}

export class PlaybookContext extends PlaybookNode {
    public readonly children: PlaybookNode[] = [];

    resolvedContext?: boolean;
    constructor(node: PlaybookNode & { resolvedContext?: boolean }, parent?: PlaybookContext) {
        super(node, parent);
        this.resolvedContext = node.resolvedContext;
    }
    public append(child: PlaybookNode): PlaybookNode {
        child.context = this;
        this.children.push(child);
        return this;
    }
}

export class PlaybookPipe extends PlaybookNode {}
