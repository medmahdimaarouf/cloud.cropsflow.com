<script lang="ts" setup>
import { ContextNode } from '@/models/playbook';
import { Handle, Node, Position, useNode, useVueFlow } from '@vue-flow/core';
import { defineProps, onMounted, watch } from 'vue';
const props = defineProps<{ node: ContextNode }>();
const { addNodes, updateNode, addEdges, updateEdge } = useVueFlow();
const { node } = useNode();

function addHead() {
    const HEAD_NODE: Node = {
        id: `${props.node.id}-head`,
        parentNode: props.node.id,
        type: 'context-head',
        position: {
            x: 0, //node.position.x,
            y: 0 //node.position.y
        },
        data: props.node,
        draggable: false,
        selectable: false,
        expandParent: true,
        width: node.dimensions.width,
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
    };

    addNodes([HEAD_NODE]);

    return HEAD_NODE;
}

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

onMounted(() => {
    const contextHeaader = addHead();
    const placeholder = addPlaceholder();
    addEdge(contextHeaader, placeholder);
    watch(
        () => node.dimensions,
        (dimensions) => {
            if (dimensions.width > 0 && dimensions.height > 0) {
                updateNode(contextHeaader.id, { width: dimensions.width });
                updateNode(placeholder.id, { position: { x: node.dimensions.width / 2 - 10, y: 120 } });
            }
        },
        { immediate: true, deep: true }
    );
});
</script>

<template>
    <slot></slot>
    <Handle
        :id="node.id + '-previous'"
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
        :id="node.id + '-next'"
        :type="'source'"
        :position="Position.Bottom"
        :style="{
            backgroundColor: 'lime',
            borderRadius: '0%',
            width: '6px',
            height: '6px'
        }"
    />
    <slot style="background-color: red; width: 50px; height: 50px" />
</template>
