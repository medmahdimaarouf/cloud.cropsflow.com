<script lang="ts" setup>
import { Handle, Position, useNode } from '@vue-flow/core';
import Button from 'primevue/button';

const { node } = useNode();
</script>

<template>
    <Handle :id="node.id + '-previous'" :type="'target'" :position="Position.Top" />
    <Button class="placeholder-button" icon="pi pi-plus-circle" size="samll" severity="contrast" variant="text" raised rounded />
    <Handle :id="node.id + '-next'" :type="'source'" :position="Position.Bottom" />
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
