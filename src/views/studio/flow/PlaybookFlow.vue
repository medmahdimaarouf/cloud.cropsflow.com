<script lang="ts" setup>
import { ActionNode, ContextNode } from '@/models/playbook/playbook-node';
import { Playbook, PlaybookContextViewFlowNode, PlaybookViewFlowManager } from '@/service/playbook-vueflow-manager';
import { Controls } from '@vue-flow/controls';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { onMounted } from 'vue';
import NodePlaceholder from './PlaceholderNode.vue';
import StarterNode from './StarterNode.vue';
import Action from './action/Action.vue';
import Context from './context/Context.vue';
import ContextHead from './context/ContextHead.vue';
const { onConnect, addEdges, setViewport, project, getEdges, addNodes } = useVueFlow();
const { playbook } = defineProps<{ playbook: Playbook }>();

const playbookViewManager: PlaybookViewFlowManager = new PlaybookViewFlowManager(playbook, useVueFlow());

onMounted(() => {
    playbookViewManager.draw();
    const firstContext: PlaybookContextViewFlowNode = playbookViewManager.addNode(
        new ContextNode({
            id: 'action-context',
            name: 'Simple Action',
            selector: 'selector',
            className: 'ActionContext',
            resolvedContext: true
        })
    ) as PlaybookContextViewFlowNode;
    firstContext.addNode(
        new ActionNode({
            id: 'child-action-context',
            name: 'Simple Action',
            selector: 'selector',
            className: 'ActionContext'
        })
    );
    playbookViewManager.addNode(
        new ActionNode({
            id: 'action',
            name: 'Action with signle context',
            selector: 'selector',
            className: 'ActionContext'
        })
    );
    playbookViewManager.addNode(
        new ActionNode({
            id: 'action-1',
            name: 'Action 1 with signle context',
            selector: 'selector',
            className: 'ActionContext'
        })
    );
});

/*
function createStarterNode(): Node {
    const screenCenter = { x: window.innerWidth / 2, y: 0 };
    const graphCenter = project(screenCenter);
    const START: Node = {
        id: 'start',
        type: 'start',
        position: {
            x: graphCenter.x, // center node of ~80px width
            y: 10
        },
        draggable: false // Optional: lock it in place
        //selectable: false // Optional: prevent selection
    };

    return START;
}
*/
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
                <template #node-placeholder>
                    <NodePlaceholder></NodePlaceholder>
                </template>
                <template #node-start="nodeProps">
                    <StarterNode v-bind="nodeProps" />
                </template>
                <template #node-action="nodeProps">
                    <Action :node="nodeProps.data" v-bind="nodeProps" />
                </template>

                <template #node-context="nodeProps">
                    <Context :node="nodeProps.data" v-bind="nodeProps" />
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
