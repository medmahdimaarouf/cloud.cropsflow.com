<script lang="ts" setup>
import { ContextNode } from '@/models/playbook/playbook-node';
import { Playbook, PlaybookViewManager } from '@/service/playbook-manager.service';
import { Controls } from '@vue-flow/controls';
import { Node, VueFlow, useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { onMounted } from 'vue';
import NodePlaceholder from './PlaceholderNode.vue';
import StarterNode from './StarterNode.vue';
import Action from './action/Action.vue';
import Context from './context/Context.vue';
import ContextHead from './context/ContextHead.vue';
const { onConnect, addEdges, setViewport, project, getEdges, addNodes } = useVueFlow();
const { playbook } = defineProps<{ playbook: Playbook }>();

const playbookViewManager: PlaybookViewManager = new PlaybookViewManager(playbook, useVueFlow());
function createContext(context: ContextNode) {
    const ACTION_CONTEXT_NODE: Node = {
        id: context.id,
        type: 'context',
        position: {
            x: 50,
            y: 120
        },
        data: context,
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
    addNodes([ACTION_CONTEXT_NODE]);
    return ACTION_CONTEXT_NODE;
}
onMounted(() => {
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
    const actionContext = new ContextNode({
        id: 'action-context',
        name: 'Action with signle context',
        selector: 'selector',
        className: 'ActionContext'
    });
    addNodes([START]);
    //createContext(actionContext);
    playbookViewManager.addNode(actionContext);
    console.log(getEdges.value);
});
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
