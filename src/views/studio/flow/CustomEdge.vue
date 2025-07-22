<script lang="ts" setup>
import { BaseEdge, getSmoothStepPath, useVueFlow } from '@vue-flow/core';
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

const path = computed(() => getSmoothStepPath(props));
</script>

<template>
    <BaseEdge :path="path[0]" :style="'strength'" />

    <!--<EdgeLabelRenderer>
        <div
            :style="{
                pointerEvents: 'all',
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
                zIndex: 200
            }"
            class="nodrag nopan"
        >
            <Button class="placeholder-button bg-white" icon="pi pi-plus-circle" size="samll" raised rounded />
        </div>
    </EdgeLabelRenderer>
    -->
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
