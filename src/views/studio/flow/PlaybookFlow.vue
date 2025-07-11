<script lang="ts" setup>
import { GET_ROOT_NODE } from '@/models/playbook/demo';
import { Controls } from '@vue-flow/controls';
import { Node, VueFlow, useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { onMounted } from 'vue';
import ActionContextNode from './ActionContextNode.vue';
import ActionNode from './ActionNode.vue';
import CustomEdge from './CustomEdge.vue';
import StarterNode from './StarterNode.vue';

const { onConnect, addEdges, setViewport, project, addNodes } = useVueFlow();

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
        data: { name: 'Connect to MongoDB' },
        draggable: false // Optional: lock it in place
        //selectable: false // Optional: prevent selection
    };
    console.log(GET_ROOT_NODE());
    addNodes([START, ...GET_ROOT_NODE().getAllNodes()]);
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
                <template #node-start="nodeProps">
                    <StarterNode v-bind="nodeProps" />
                </template>
                <template #node-action="nodeProps">
                    <ActionNode v-bind="nodeProps" />
                </template>

                <template #node-context="nodeProps">
                    <ActionContextNode v-bind="nodeProps" />
                </template>

                <template #edge-custom="edgeProps">
                    <CustomEdge v-bind="edgeProps" />
                </template>
            </VueFlow>
        </div>
    </div>
</template>
<style lang="scss" scoped>
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
        flex: 1;
        height: 100%;
        width: 100%;
        background-color: rgba(223, 221, 221, 0.37);
    }
}
</style>
