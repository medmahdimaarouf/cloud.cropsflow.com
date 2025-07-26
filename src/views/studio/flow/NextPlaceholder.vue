<script lang="ts" setup>
import { PlaybookContext, PlaybookNode } from '@/models/playbook';
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core';
import { onMounted } from 'vue';

const { onNodesChange, updateNode } = useVueFlow();

const { node: flowNode } = useNode();
const { node: playbookNode, context } = defineProps<{ node: PlaybookNode; context?: PlaybookContext }>();

const emit = defineEmits<{ (e: 'on-next', placeholderId: string, childContext?: PlaybookContext, index?: number): void }>();

function getChildIndex(): number | undefined {
    return context?.children.indexOf(playbookNode);
}

async function onNextRequested() {
    emit('on-next', flowNode.id, context, getChildIndex());
}

onMounted(() => {});
</script>

<template>
    <div class="action-slot" @click="onNextRequested">
        <Handle :id="flowNode.id + '-next'" :type="'target'" :position="Position.Top" />

        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="none">
            <path fill="#838282" fill-rule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z" />
        </svg>
        <Handle id="attach" type="source" :position="Position.Bottom" :connectable="true" />
    </div>
    <!--<Button class="placeholder-button" icon="pi pi-plus-circle" size="samll" severity="contrast" variant="text" @click="onNextRequested" raised rounded />-->
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
.action-slot {
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #838282;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition:
        box-shadow 0.2s ease,
        background-color 0.2s ease,
        border 0.2s ease;
}

.action-slot:hover {
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
