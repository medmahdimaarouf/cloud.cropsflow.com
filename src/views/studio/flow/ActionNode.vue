<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core';
import { ref } from 'vue';

const counter = ref(0);
</script>

<template>
    <div class="flow-node action">
        <div class="fow-node-header">
            <img src="/demo/images/mongo.png" />
            <span>Connect to mongo db</span>
        </div>
        <Handle
            id="precedent"
            type="target"
            :position="Position.Top"
            :style="{
                backgroundColor: 'lime',
                borderRadius: '0%',
                width: '12px',
                height: '12px',
                border: '2px solid black'
            }"
        />
        <Handle
            id="next"
            type="source"
            :position="Position.Bottom"
            :style="{
                backgroundColor: 'lime',
                borderRadius: '0%',
                width: '12px',
                height: '12px',
                border: '2px solid black'
            }"
        />
    </div>
</template>

<style lang="scss">
.flow-node.selected {
    border: 1px solid var(--primary-color);
}
.flow-node {
    display: flex;
    flex-direction: column;
    width: 260px;
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
