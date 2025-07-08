<script lang="ts" setup>
import { Controls } from '@vue-flow/controls';
import { Node, VueFlow, useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { ref } from 'vue';
import ActionContextNode from './ActionContextNode.vue';
import ActionNode from './ActionNode.vue';
import CustomEdge from './CustomEdge.vue';

const { onConnect, addEdges } = useVueFlow();
const ConnectToDbAction: Node = { id: 'mongo-connect', type: 'action', data: { name: 'Connect to mongoDb' }, position: { x: 50, y: 0 } };
const ConnectToDbActionContext: Node = { id: 'mongo-connect-context', type: 'context', data: { name: 'Mongo db context' }, position: { x: 50, y: 25 } };
const HttpGetAction: Node = { id: 'http-get-action', type: 'action', parentNode: 'mongo-connect-context', data: { name: 'Http get request' }, position: { x: 50, y: 75 }, expandParent: true };
const HttpGetActionContext: Node = { id: 'http-get-action-context', type: 'action', parentNode: 'mongo-connect-context', data: { name: 'Http response context' }, position: { x: 50, y: 100 }, expandParent: true };

const nodes = ref<Array<Node>>([ConnectToDbAction, ConnectToDbActionContext, HttpGetAction, HttpGetActionContext]);

const edges = ref([
    /*{ id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '2', target: '3' }*/
]);

onConnect((params) => {
    addEdges([params]);
});
</script>

<template>
    <div class="flow">
        <VueFlow v-model:nodes="nodes" v-model:edges="edges" fit-view-on-init class="vue-flow-basic-example" :default-edge-options="{ type: 'step' }" :min-zoom="0.2" :max-zoom="4">
            <!--<Background pattern-color="#aaa" :gap="4" />-->

            <MiniMap />

            <Controls />

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
</template>
<style lang="scss" scoped>
.flow {
    height: 100%;
    width: 100%;
    flex: 1;
}
</style>
