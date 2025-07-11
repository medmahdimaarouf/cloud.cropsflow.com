<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core';
import { defineEmits, defineProps } from 'vue';

const props = defineProps<{
    id: string;
    data: {
        name: string;
    };
    selected: boolean;
}>();

const emit = defineEmits<{
    (e: 'send', payload: string): void;
}>();

function sendMessage() {
    emit('send', 'Hello from child!');
}
</script>

<template>
    <div class="flex flex-center content-center items-center gap-2 cursor-pointer px-4 py-2">
        <Avatar icon="pi pi-sitemap" size="large" />
        <div>
            <span>{{ $props.data.name }}</span>
            <p>Main Context</p>
        </div>
    </div>
    <slot></slot>
    <Handle
        id="precedent"
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
    <slot style="background-color: red; width: 50px; height: 50px" />
</template>

<style lang="scss">
.flow-node.selected {
    border: 1px solid var(--primary-color);
}
.action-context {
    display: flex;
    flex-direction: column;
    height: 180px;
    width: 100%;
    margin: 22px;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    background-color: #ffff;
    .fow-node-header {
        display: flex;
        align-items: center;
        align-content: start;
        width: 100%;
        height: 24px;
        flex-wrap: nowrap;
        padding: 8px 2px;
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
