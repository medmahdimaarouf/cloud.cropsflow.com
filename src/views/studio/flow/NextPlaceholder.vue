<script lang="ts" setup>
import { PlaybookContext, PlaybookNode } from '@/models/playbook';
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core';
import Button from 'primevue/button';
import { onMounted } from 'vue';

const { onNodesChange, updateNode } = useVueFlow();
const { node: flowNode } = useNode();
const { node: playbookNode, context } = defineProps<{ node: PlaybookNode; context?: PlaybookContext }>();

const emit = defineEmits<{
    (e: 'on-next', placeholderId: string, context?: PlaybookContext, index?: number): void;
}>();

function getChildIndex(): number | undefined {
    return context?.children.indexOf(playbookNode);
}

async function onNextRequested() {
    emit('on-next', flowNode.id, context, getChildIndex());
}

onMounted(() => {});
</script>

<template>
    <Handle :id="flowNode.id + '-previous'" :type="'target'" :position="Position.Top" />
    <Handle :id="flowNode.id + '-next'" :type="'target'" :position="Position.Top" />
    <Button class="placeholder-button" icon="pi pi-plus-circle" size="samll" severity="contrast" variant="text" @click="onNextRequested" raised rounded />
</template>

<style lang="scss">
.p-button {
    background-color: #ffff;
}
.placeholder-button {
    max-width: 20px;
    max-height: 20px;
    padding: 2px;
    background-color: white;
    .p-button-icon {
        color: #838282;
        margin: 2px;
    }
}
</style>
