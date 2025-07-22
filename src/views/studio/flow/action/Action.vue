<script lang="ts" setup>
import { PlaybookAction } from '@/models/playbook';
import { Dimensions, GraphNode, Handle, Node, Position, useNode, useVueFlow, XYPosition } from '@vue-flow/core';
import { defineProps, onMounted, reactive } from 'vue';

const { updateNode, addNodes, addEdges } = useVueFlow();
const props = defineProps<{ node: PlaybookAction; previousNode: string }>();
const { node: previousNode } = useNode(props.previousNode);
const { node: vueFlowNode } = useNode();
const playbookAction: PlaybookAction = reactive<PlaybookAction>(props.node);

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

// Usage example in your component

function drawNextPlaceholderNode(): Node {
    const actualDimensions: Dimensions = vueFlowNode.dimensions;
    const NEXT_PLACEHOLDER: Node = {
        id: `${playbookAction.id}|next-placeholder`,
        type: 'placeholder',
        position: {
            x: actualDimensions.width / 2 - 10,
            y: actualDimensions.height + 10
        },
        data: {
            node: playbookAction,
            context: playbookAction.context
        },
        parentNode: vueFlowNode.id,
        draggable: false,
        selectable: false,
        expandParent: false
    };
    addNodes([NEXT_PLACEHOLDER]);
    addEdges([
        {
            id: `${playbookAction.id}|${NEXT_PLACEHOLDER.id}`,
            source: playbookAction.id,
            target: NEXT_PLACEHOLDER.id,
            sourceHandle: `${playbookAction.id}-next`,
            targetHandle: `${NEXT_PLACEHOLDER.id}-previous`
        }
    ]);

    return NEXT_PLACEHOLDER;
}

function updatePositon() {
    const previousNodeDimensions: Dimensions = previousNode.dimensions;
    const previousNodePositon: XYPosition = getAbsolutePosition(previousNode);
    const actualDimensions: Dimensions = {
        width: useNode(previousNode.id).nodeEl.value?.getBoundingClientRect().width!,
        height: useNode(previousNode.id).nodeEl.value?.getBoundingClientRect().height!
    };
    let x = previousNodePositon.x;
    x += previousNodeDimensions.width / 2;
    x -= actualDimensions.width / 2;
    updateNode(vueFlowNode.id, {
        position: {
            x: x,
            y: previousNodePositon.y + previousNodeDimensions.height + 30
        }
    });
}

onMounted(() => {
    updatePositon();
    setTimeout(() => {
        drawNextPlaceholderNode();
    }, 0);
});
</script>

<template>
    <div class="flex flex-center content-center items-center gap-2 cursor-pointer px-4 my-4 bg-white rounded">
        <Avatar icon="pi pi-sitemap" size="large" />
        <div>
            <span class="text-xl font-bold m-0">{{ $props.node.name }}</span>
            <p>{{ $props.node.selector }}</p>
        </div>
    </div>

    <!--
        <div class="next-container flex flex-center content-center items-center gap-2 px-4 py-2">
            <Button icon="pi pi-plus-circle" label="Add next"></Button>
        </div>
    -->

    <Handle
        id="previous"
        type="target"
        :position="Position.Top"
        :style="{
            backgroundColor: 'lime',
            borderRadius: '0%',
            width: '6px',
            height: '6px'
        }"
    />
    <Handle id="next" type="source" :position="Position.Bottom" />
    <Handle
        id="pipe"
        type="source"
        :position="Position.Left"
        :connectable="true"
        :style="{
            backgroundColor: 'lime',
            borderRadius: '0%',
            width: '6px',
            height: '6px'
        }"
    />
    <Handle
        id="context"
        type="source"
        :connectable="true"
        :position="Position.Right"
        :style="{
            backgroundColor: 'lime',
            borderRadius: '0%',
            width: '6px',
            height: '6px'
        }"
    />
</template>

<style lang="scss">
.flow-node.selected {
    border: 1px solid var(--primary-color);
}
.flow-node {
    display: flex;
    flex-direction: column;
    width: 240px;
    border: 1px solid #e0e0e0;
    background-color: #ffff;
    border-radius: 2px;
    .fow-node-header {
        display: flex;
        align-items: center;
        align-content: start;
        width: 100%;
        height: 24px;
        flex-wrap: nowrap;
        padding: 8px 2px;
        border-bottom: 1px solid #e0e0e0;
        gap: 6px;
        img,
        svg {
            max-width: 18px;
        }
        span {
            font-size: 8px;
            flex-grow: 1;
            text-align: start;
        }
    }
}
</style>
