<script lang="ts" setup>
import { ContextNode } from '@/models/playbook';
import { Handle, Node, Position, useNode, useVueFlow } from '@vue-flow/core';
import Button from 'primevue/button';
import { defineProps, onMounted, watch } from 'vue';

const props = defineProps<{ node: ContextNode }>();
const { addNodes, updateNode, addEdges, updateNodeDimensions } = useVueFlow();
const { node } = useNode();

function addPlaceholder(previousId?: string, nextId?: string) {
    //const { node: previous } = useNode(previousId);
    //const { node: next } = useNode(nextId);
    const PLACE_HOLDER: Node = {
        id: 'placeholder', //`${previous.id}|${next.id}`,
        type: 'placeholder',
        parentNode: props.node.id,
        position: {
            x: node.dimensions.width / 2 - 12.5,
            y: 120
        },
        draggable: false,
        selectable: false,
        expandParent: true
    };

    addNodes([PLACE_HOLDER]);

    return PLACE_HOLDER;
}

function addEdge(from: Node, to: Node, type?: string) {
    const edge = {
        id: `my-fucking-edge`,
        source: from.id,
        sourceHandle: 'context-head-next', // using the handle from ContextHead
        target: to.id,
        targetHandle: 'placeholder-previous', // using the handle from Placeholder
        type: type || 'smoothstep',
        style: { stroke: '#1976d2', strokeWidth: 2 }
    };

    addEdges([edge]);
    return edge;
}

onMounted(async () => {
    const head = useNode(`${node.id}-head`);
    const nextPlaceHolder = useNode(`${node.id}|next-placeholder`);
    watch(
        () => node.dimensions,
        async (dimensions) => {
            if (dimensions.width > 0 && dimensions.height > 0) {
                updateNode(nextPlaceHolder.id, {
                    position: {
                        x: node.dimensions.width / 2 - 10,
                        y: node.dimensions.height + 10
                    }
                });
                updateNode(head.id, {
                    style: {
                        width: `${dimensions.width}px`,
                        height: '60px',
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
        },
        { immediate: true, deep: true }
    );
});
</script>

<template>
    <div v-if="!node.data.resolvedContext" class="context-resolve">
        <Button icon="pi pi-plus-circle" label="Add node" severity="contrast" variant="text" raised />
    </div>

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
