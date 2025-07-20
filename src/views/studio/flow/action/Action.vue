<script lang="ts" setup>
import { PlaybookAction } from '@/models/playbook';
import { Dimensions, Handle, Node, Position, useNode, useVueFlow } from '@vue-flow/core';
import { defineProps, onMounted, reactive, watch } from 'vue';

const { updateNode, addNodes, addEdges } = useVueFlow();
const props = defineProps<{ node: PlaybookAction; placeholder: string }>();
const placeholderId: String = reactive<String>(props.placeholder);
const { node: vueFlowNode } = reactive(useNode());
const playbookAction: PlaybookAction = reactive<PlaybookAction>(props.node);
const placeholdernNode = useNode(placeholderId.toString()).node;

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
    updateNode(
        vueFlowNode.id,
        vueFlowNode.parentNode
            ? {
                  position: {
                      x: placeholdernNode.position.x + placeholdernNode.dimensions.width / 2 - vueFlowNode.dimensions.width / 2 - 10,
                      y: placeholdernNode.position.y + 30
                  }
              }
            : {
                  position: {
                      x: placeholdernNode.position.x + placeholdernNode.dimensions.width / 2 - vueFlowNode.dimensions.width / 2 - 10,
                      y: placeholdernNode.position.y + 30
                  }
              }
    );
}
function attachToPlaceHolder() {
    console.log(placeholderId);
    updatePositon();
    addEdges([
        {
            id: `${placeholdernNode.id}|${vueFlowNode.id}`,
            source: placeholdernNode.id,
            target: vueFlowNode.id,
            sourceHandle: `${vueFlowNode.id}-next`,
            targetHandle: `previous`
        }
    ]);
}
onMounted(() => {
    attachToPlaceHolder();
    watch(
        () => vueFlowNode.dimensions,
        (d) => {
            updatePositon();
        }
    );
    setTimeout(() => {
        drawNextPlaceholderNode();
    }, 0);
});
</script>

<template>
    <div class="flex flex-center content-center items-center gap-2 cursor-pointer px-4 py-2">
        <Avatar icon="pi pi-sitemap" size="large" />
        <div>
            <span>{{ $props.node.name }}</span>
            <p>{{ $props.node.selector }}</p>
        </div>
    </div>
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
    <Handle
        id="next"
        type="source"
        :position="Position.Bottom"
        :style="{
            backgroundColor: 'lime',
            borderRadius: '0%',
            width: '6px',
            height: '6px'
        }"
    />
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
