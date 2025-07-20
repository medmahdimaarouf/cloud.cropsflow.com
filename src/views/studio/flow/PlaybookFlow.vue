<script lang="ts" setup>
import { PlaybookAction, PlaybookContext, PlaybookPipe } from '@/models/playbook/playbook-node';
import { Playbook, PlaybookViewFlowManager } from '@/service/playbook-vueflow-manager';
import { Controls } from '@vue-flow/controls';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { onMounted } from 'vue';
import NextPlaceholder from './NextPlaceholder.vue';
import StarterNode from './StarterNode.vue';
import Action from './action/Action.vue';
import Context from './context/Context.vue';
import ContextHead from './context/ContextHead.vue';
const { onConnect, addEdges, setViewport, project, getEdges, addNodes } = useVueFlow();
const { playbook } = defineProps<{ playbook: Playbook }>();

const playbookViewManager: PlaybookViewFlowManager = new PlaybookViewFlowManager(playbook, useVueFlow());

function addPlaybookContextVueFlowNode(playbookContext: PlaybookContext, placeholder?: string): PlaybookContext {
    addNodes({
        id: playbookContext.id,
        type: 'context',
        parentNode: playbookContext.context?.id,
        expandParent: !!playbookContext.context,
        data: {
            node: playbookContext,
            placeholder: placeholder
        },
        position: { x: 0, y: 0 },
        draggable: false,
        selectable: true,
        width: 380,
        height: 140,
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
    });

    return playbookContext;
}

function addPlaybookActionVueFlowNode(playbookAction: PlaybookAction, placeholder?: string): PlaybookAction {
    addNodes({
        id: playbookAction.id,
        parentNode: playbookAction.context?.id,
        expandParent: !!playbookAction.context,
        width: 280,
        position: { x: 0, y: 0 },
        type: 'action',
        draggable: true,
        selectable: true,
        data: {
            node: playbookAction,
            placeholder: placeholder
        },
        style: {
            backgroundColor: '#ffff'
        }
    });

    return playbookAction;
}

function addPlaybookPipeVueFlowNode(playbookPipe: PlaybookPipe, placeholder?: string): PlaybookPipe {
    addNodes({
        id: playbookPipe.id,
        parentNode: playbookPipe.context?.id,
        expandParent: !!playbookPipe.context,
        width: 280,
        position: { x: 0, y: 0 },
        type: 'pipe',
        data: {
            node: playbookPipe,
            placeholder: placeholder
        },
        style: {
            backgroundColor: '#ffff'
        }
    });
    return playbookPipe;
}

onMounted(() => {
    const playbookContext: PlaybookContext = addPlaybookContextVueFlowNode(
        new PlaybookContext({
            id: 'action-context',
            name: 'Simple Action',
            selector: 'selector',
            className: 'ActionContext',
            resolvedContext: true
        })
    );
});

function onNextRequested(placeholderId: string, context?: PlaybookContext, index?: number): void {
    const next = new PlaybookAction({
        id: Date.now().toString(),
        name: 'Simple Action',
        className: 'SimpleAction',
        selector: 'action-selector'
    });
    if (context) {
        context.append(next);
    } else {
        // add directly to playbook
    }
    addPlaybookActionVueFlowNode(next, placeholderId);
}
</script>

<template>
    <div class="playbook-flow">
        <div class="flex flex-center content-center items-center gap-2 cursor-pointer px-4 py-2">
            <Avatar icon="pi pi-sitemap" size="large" />
            <div>
                <span>Playbook name</span>
                <p>Main Context</p>
            </div>
        </div>
        <div class="flow">
            <VueFlow :default-zoom="40" :default-position="[0, 0]" :fit-view-on-init="false" :default-edge-options="{ type: 'step' }" :max-zoom="40" :min-zoom="-40">
                <!--<Background pattern-color="#aaa" :gap="4" />-->

                <MiniMap style="background-color: #ffffff" />

                <Controls />
                <template #node-start="nodeProps">
                    <StarterNode v-bind="nodeProps" />
                </template>
                <template #node-placeholder="nodeProps">
                    <NextPlaceholder :context="nodeProps.data.context" :node="nodeProps.data.node" @on-next="onNextRequested"></NextPlaceholder>
                </template>

                <template #node-action="nodeProps">
                    <Action :placeholder="nodeProps.data.placeholder" :node="nodeProps.data.node" v-bind="nodeProps" />
                </template>

                <template #node-context="nodeProps">
                    <Context :placeholder="nodeProps.data.placeholder" :node="nodeProps.data.node" v-bind="nodeProps" />
                </template>

                <template #node-context-head="nodeProps">
                    <ContextHead :node="nodeProps.data" v-bind="nodeProps" />
                </template>
            </VueFlow>
        </div>
    </div>
</template>
<style lang="scss" scoped>
/*   DO NOT TOUCH   */
.playbook-flow {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
    height: 100%;
    > div {
        border-bottom: 1px solid rgba(170, 170, 170, 0.37);
    }
    .flow {
        display: block;
        position: relative;
        flex: 1;
        height: 100%;
        width: 100%;
        background-color: rgba(223, 221, 221, 0.37);
    }
}
</style>
