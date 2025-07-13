<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core';
import Button from 'primevue/button';
</script>

<template>
    <Button class="placeholder-button" icon="pi pi-plus-circle" size="samll" severity="contrast" variant="text" raised rounded />
    <Handle :id="'placeholder-previous'" :type="'target'" :position="Position.Top" />
    <Handle :id="'placeholder-next'" :type="'source'" :position="Position.Bottom" />
</template>

<style lang="scss">
.placeholder-button {
    max-width: 20px;
    max-height: 20px;
    padding: 2px;
    .p-button-icon {
        color: #838282;
        margin: 2px;
    }
}
</style>
