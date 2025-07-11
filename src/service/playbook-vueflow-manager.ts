import { PlaybookNode } from '@/models';

export class ViewFlowNodeManager {
    node: PlaybookNode;
    constructor(node: PlaybookNode) {
        this.node = node;
    }
}

export class PlaybookViewFlowManager extends ViewFlowNodeManager {}
