<script lang="ts" setup>
import { PlaybookPipe } from '@/models/playbook';
import { Handle, Position } from '@vue-flow/core';
import { defineProps, onMounted, reactive } from 'vue';

const props = defineProps<{ node: PlaybookPipe; placeholder: string }>();
const playbookPipe: PlaybookPipe = reactive(props.node);
const after: String = reactive<String>(props.placeholder);
onMounted(() => {});
</script>

<template>
    <div class="flex flex-center content-center items-center gap-2 cursor-pointer px-4 py-2">
        <Avatar icon="pi pi-sitemap" size="large" />
        <div>
            <span>{{ $props.node.name }}</span>
            <p>Main Context</p>
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
