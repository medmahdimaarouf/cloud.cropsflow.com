<script lang="ts" setup>
import { BaseEdge, EdgeLabelRenderer, getStraightPath, useVueFlow } from '@vue-flow/core';
import Button from 'primevue/button';
import { computed } from 'vue';

const props: any = defineProps({
    id: {
        type: String,
        required: true
    },
    sourceX: {
        type: Number,
        required: true
    },
    sourceY: {
        type: Number,
        required: true
    },
    targetX: {
        type: Number,
        required: true
    },
    targetY: {
        type: Number,
        required: true
    },
    sourcePosition: {
        type: String,
        required: true
    },
    targetPosition: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: false
    },
    markerEnd: {
        type: String,
        required: false
    },
    style: {
        type: Object,
        required: false
    }
});

const { removeEdges } = useVueFlow();

const path = computed(() => getStraightPath(props));
</script>

<template>
    <BaseEdge :path="path[0]" />

    <EdgeLabelRenderer>
        <div
            :style="{
                pointerEvents: 'all',
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`
            }"
            class="nodrag nopan"
        >
            <Button class="placeholder-button" icon="pi pi-plus-circle" size="samll" severity="contrast" variant="text" raised rounded />
        </div>
    </EdgeLabelRenderer>
</template>

<style>
.placeholder-button {
    max-width: 20px;
    max-height: 20px;
    padding: 2px;
    .p-button-icon {
        color: #838282;
        margin: 2px;
    }
}
</style>
