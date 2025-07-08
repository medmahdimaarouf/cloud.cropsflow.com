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
    <div class="flow-node context">
        <div class="fow-node-header">
            <img src="/demo/images/mongo.png" />
            <span>{{ $props.data.name }}</span>
        </div>
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
    </div>
</template>

<style lang="scss" scoped>
.flow-node.selected {
    border: 1px solid var(--primary-color);
}
.flow-node {
    display: flex;
    flex-direction: column;
    height: 180px;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
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
