import { ActionNode, ContextNode, PipeNode, PlaybookNode } from '@/models';
import { Node, VueFlowStore } from '@vue-flow/core';

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
export class PlaybookViewManager {
    private nodes: Array<PlaybookNode> = [];
    constructor(
        private readonly playbook: Playbook,
        private vueflow: VueFlowStore
    ) {}

    addNode(node: PlaybookNode) {
        if (node instanceof ContextNode) {
            this.addContextNode(node);
        }

        if (node instanceof ActionNode) {
        }

        if (node instanceof PipeNode) {
        }
    }

    private addContextNode(node: ContextNode) {
        const ACTION_CONTEXT_NODE: Node = {
            id: node.id,
            type: 'context',
            position: {
                x: 50,
                y: 120
            },
            data: node,
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
        this.vueflow.addNodes([ACTION_CONTEXT_NODE]);
        this.nodes.push(node);
    }

    private addPipeNode(node: PipeNode) {}
}
