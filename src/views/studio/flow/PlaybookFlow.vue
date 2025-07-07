<script lang="ts" setup>
import { Controls } from '@vue-flow/controls';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { ref } from 'vue';
import ActionNode from './ActionNode.vue';
import CustomEdge from './CustomEdge.vue';

const { onConnect, addEdges } = useVueFlow();

const nodes = ref([
    { id: '1', type: 'action', label: 'Action', position: { x: 50, y: 0 } },
    { id: '2', type: 'action', label: 'Action', position: { x: 100, y: 100 } },
    { id: '3', type: 'action', label: 'Action', position: { x: 150, y: 200 } }
]);

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
        <VueFlow v-model:nodes="nodes" v-model:edges="edges" fit-view-on-init class="vue-flow-basic-example" :min-zoom="0.2" :max-zoom="4">
            <!--<Background pattern-color="#aaa" :gap="4" />-->

            <MiniMap />

            <Controls />

            <template #node-action="nodeProps">
                <ActionNode v-bind="nodeProps" />
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
