import { PlaybookContext, PlaybookNode } from '@/models';
import { VueFlowStore } from '@vue-flow/core';

export interface IPlaybook {
    id: string;
    title: string;
    icon?: string;
    context: PlaybookContext;
}

export class Playbook implements IPlaybook {
    id: string;
    title: string;
    icon?: string;
    context: PlaybookContext;
    constructor(data: IPlaybook) {
        this.id = data.id;
        this.title = data.title;
        this.icon = data.icon;
        this.context = data.context;
    }
}
export class PlaybookViewManager {
    private children: Array<PlaybookNode> = [];
    constructor(
        private readonly playbook: Playbook,
        private vueflow: VueFlowStore
    ) {}

    addChild(child: PlaybookNode) {
        this.children.push(child);
    }

    getChild(index: number): PlaybookNode | undefined {
        return this.children.at(index);
    }

    getLastChild(): PlaybookNode | undefined {
        return this.children.at(this.children.length - 1);
    }

    getFirstChild(): PlaybookNode | undefined {
        return this.children.at(0);
    }
}
