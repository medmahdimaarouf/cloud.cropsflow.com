<script lang="ts" setup>
import { PlaybookContext } from '@/models/playbook';
import { Dimensions, GraphNode, Handle, Node, Position, useNode, useVueFlow, XYPosition } from '@vue-flow/core';
import { defineProps, onMounted, watch } from 'vue';

const { updateNode, addNodes, addEdges } = useVueFlow();
const props = defineProps<{ node: PlaybookContext; previousNode: string }>();
const { node: previousNode } = useNode(props.previousNode);
const { node: vueFlowNode } = useNode();
const emit = defineEmits<{ (e: 'focus', context: PlaybookContext): void }>();

const playbookContext: PlaybookContext = props.node;
let FLOW_START_NODE: Node;

let WIDTH: number = vueFlowNode.dimensions.width;
let HEIGHT: number = vueFlowNode.dimensions.height;

let X: number = vueFlowNode.position.x;
let Y: number = vueFlowNode.position.y;

function getAbsolutePosition(node: GraphNode | undefined): XYPosition {
    let x = 0;
    let y = 0;
    let current = node;

    while (current) {
        x += current.position.x;
        y += current.position.y;
        if (!current.parentNode) break;
        current = useNode(current.parentNode).node;
    }

    return { x, y };
}

function drawNextPlaceholderNode(): Node {
    const actualDimensions: Dimensions = vueFlowNode.dimensions;
    const NEXT_PLACEHOLDER: Node = {
        id: `${playbookContext.id}|next-placeholder`,
        type: 'placeholder',
        position: {
            x: actualDimensions.width / 2 - 10,
            y: actualDimensions.height + 20
        },
        data: {
            node: playbookContext,
            context: playbookContext.context
        },
        parentNode: vueFlowNode.id,
        draggable: false,
        selectable: false,
        expandParent: false
    };
    addNodes([NEXT_PLACEHOLDER]);
    addEdges([
        {
            id: `${playbookContext.id}|${NEXT_PLACEHOLDER.id}`,
            source: playbookContext.id,
            target: NEXT_PLACEHOLDER.id,
            sourceHandle: `${playbookContext.id}-next`,
            targetHandle: `${NEXT_PLACEHOLDER.id}-previous`
        }
    ]);

    return NEXT_PLACEHOLDER;
}
function setPositon() {
    const previousNodeDimensions: Dimensions = previousNode.dimensions;
    const previousNodePositon: XYPosition = getAbsolutePosition(previousNode);
    const currentNodeDimensions: Dimensions = {
        width: useNode(previousNode.id).nodeEl.value?.getBoundingClientRect().width!,
        height: useNode(previousNode.id).nodeEl.value?.getBoundingClientRect().height!
    };
    let x = previousNodePositon.x;
    x += previousNodeDimensions.width / 2;
    x -= currentNodeDimensions.width / 2;
    updateNode(vueFlowNode.id, {
        position: {
            x: x,
            y: previousNodePositon.y + previousNodeDimensions.height + 30
        }
    });
    X = vueFlowNode.position.x;
    Y = vueFlowNode.position.y;
}
function setDimensions() {
    WIDTH = vueFlowNode.dimensions.width;
    HEIGHT = vueFlowNode.dimensions.height;
}
function drawChildNextPlaceholder(): Node {
    const currentNodeDimensions: Dimensions = {
        width: useNode(previousNode.id).nodeEl.value?.getBoundingClientRect().width!,
        height: useNode(previousNode.id).nodeEl.value?.getBoundingClientRect().height!
    };
    FLOW_START_NODE = {
        id: `${vueFlowNode.id}-child-placeholder`,
        type: 'placeholder',
        parentNode: vueFlowNode.id,
        position: {
            x: currentNodeDimensions.width / 2 - 10,
            y: 60
        },
        data: {
            node: playbookContext,
            context: playbookContext
        }
    };

    addNodes(FLOW_START_NODE);

    return FLOW_START_NODE;
}

function onResized(dimensions: Dimensions): void {
    updateNode(`${playbookContext.id}|next-placeholder`, {
        position: {
            x: dimensions.width / 2 - 10,
            y: dimensions.height + 20
        }
    });

    updateNode(`${vueFlowNode.id}-child-placeholder`, {
        position: {
            x: dimensions.width / 2 - 10,
            y: 60
        }
    });
    WIDTH = dimensions.width;
    HEIGHT = dimensions.height;
}

onMounted(() => {
    setPositon();
    setDimensions();
    drawNextPlaceholderNode();
    drawChildNextPlaceholder();
    watch(
        () => vueFlowNode.dimensions,
        (dimensions) => {
            onResized(dimensions);
        },
        { deep: true }
    );
});

function onFocus() {
    emit('focus', playbookContext);
}
</script>

<template>
    <div class="context-head flex flex-center content-center items-center gap-2 cursor-pointer px-4 py-4" @click="onFocus">
        <Avatar icon="pi pi-sitemap" size="large" />
        <div>
            <span class="text-xl font-bold m-0">{{ $props.node.name }}</span>
            <p>Context Name</p>
        </div>
    </div>
    <slot></slot>
    <!--<Button class="placeholder-button" icon="pi pi-plus-circle" size="samll" severity="contrast" variant="text" raised rounded />-->
    <Handle
        :id="'previous'"
        :type="'target'"
        :position="Position.Top"
        :style="{
            backgroundColor: 'lime',
            borderRadius: '0%',
            width: '6px',
            height: '6px',
            top: '-4px'
        }"
    />
    <Handle
        :id="'next'"
        :type="'source'"
        :position="Position.Bottom"
        :style="{
            backgroundColor: 'lime',
            borderRadius: '0%',
            width: '6px',
            height: '6px'
        }"
    />

    <Handle
        :id="'context'"
        :type="'target'"
        :position="Position.Left"
        :style="{
            backgroundColor: 'lime',
            borderRadius: '0%',
            width: '6px',
            height: '6px'
        }"
    />
</template>
<style lang="scss" scoped>
.context-resolve {
    padding: 72px 12px 12px 12px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    gap: 4px;
}

.context-head {
    max-height: 50px;
    border-bottom: 1px solid #e0e0e0;
}
</style>
