<script lang="ts" setup>
import { PlaybookContext } from '@/models/playbook';
import { Dimensions, Handle, Node, Position, useNode, useVueFlow } from '@vue-flow/core';
import { defineProps, onMounted, reactive, watch } from 'vue';

const { addNodes, updateNode, addEdges, onEdgesChange, updateNodeDimensions } = useVueFlow();
const props = defineProps<{ node: PlaybookContext; placeholder: String }>();

const { node: vueFlowNode } = reactive(useNode());
const playbookContext: PlaybookContext = reactive<PlaybookContext>(props.node);
const after: String = reactive<String>(props.placeholder);

function drawHeadNode(): void {
    addNodes({
        id: `${playbookContext.id}-head`,
        parentNode: playbookContext.id,
        type: 'context-head',
        position: {
            x: 0,
            y: 0
        },
        data: playbookContext,
        draggable: false,
        selectable: false,
        expandParent: true,
        width: vueFlowNode.dimensions.width,
        height: 60,
        style: {
            display: 'flex',
            alignContent: 'center',
            flex: '1',
            flexGrow: 1,
            padding: '8px',
            marginRight: '8px',
            backgroundColor: '#ffff',
            borderRadius: '2px',
            border: '1px solid #e0e0e0'
        }
    });
}
function drawHeadNextPlaceholderNode() {
    const actualDimensions: Dimensions = vueFlowNode.dimensions;
    const NEXT_PLACEHOLDER: Node = {
        id: `${playbookContext.id}|head-next-placeholder`,
        type: 'placeholder',
        position: {
            x: actualDimensions.width / 2 - 10,
            y: 70
        },
        data: {
            node: playbookContext,
            context: playbookContext
        },
        parentNode: `${playbookContext.id}`,
        expandParent: true,
        draggable: false,
        selectable: false
    };
    addNodes(NEXT_PLACEHOLDER);
    addEdges([
        {
            id: `${playbookContext.id}|${NEXT_PLACEHOLDER.id}`,
            source: `${playbookContext.id}-head`,
            target: NEXT_PLACEHOLDER.id,
            sourceHandle: `${playbookContext.id}-next`,
            targetHandle: `${NEXT_PLACEHOLDER.id}-previous`
        }
    ]);

    return NEXT_PLACEHOLDER;
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
        selectable: false
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

function fitHeadSize(): void {
    const head = useNode(`${playbookContext.id}-head`);
    const nextPlaceHolder = useNode(`${playbookContext.id}|next-placeholder`);
    watch(
        () => vueFlowNode.dimensions,
        async (dimensions) => {
            if (dimensions.width > 0 && dimensions.height > 0) {
                updateNode(nextPlaceHolder.id, {
                    position: {
                        x: vueFlowNode.dimensions.width / 2 - 10,
                        y: vueFlowNode.dimensions.height + 10
                    }
                });
                updateNode(head.id, {
                    style: {
                        display: 'flex',
                        alignContent: 'center',
                        flex: '1',
                        flexGrow: 1,
                        padding: '8px',
                        marginRight: '8px',
                        backgroundColor: '#ffff',
                        borderRadius: '2px',
                        border: '1px solid #e0e0e0',
                        width: dimensions.width + 'px'
                    }
                });
            }
        },
        { immediate: true, deep: true }
    );
}

function fix_head_placeholder() {
    const head = useNode(`${playbookContext.id}-head`);
    watch(
        () => head.node.dimensions,
        (dimensions) => {
            updateNode(`${playbookContext.id}|head-next-placeholder`, {
                position: {
                    x: dimensions.width / 2 - 10,
                    y: 80
                }
            });
        }
    );
}

onMounted(async () => {
    drawHeadNode();
    drawHeadNextPlaceholderNode();
    drawNextPlaceholderNode();
    fitHeadSize();
    fix_head_placeholder();
});
</script>

<template>
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
</style>
