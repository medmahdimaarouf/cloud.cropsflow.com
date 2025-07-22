<script lang="ts" setup>
import Button from 'primevue/button';

const props: any = defineProps();
</script>

<template>
    <div class="flow-menu flex flex-column flex-center items-center gap-2 cursor-pointer px-4 py-2 rounded">
        <Button icon="pi pi-plus" variant="text" severity="secondary" class="cursor-pointer" />
        <Button icon="pi pi-minus" variant="text" severity="secondary" class="cursor-pointer" />
        <Button icon="pi pi-info-circle" variant="text" severity="secondary" class="cursor-pointer" />
        <Button icon="pi pi-clock" variant="text" severity="secondary" class="cursor-pointer" />
        <Button icon="pi pi-code" variant="text" severity="secondary" class="cursor-pointer" />
    </div>
</template>

<style>
.flow-menu {
    position: absolute;
    cursor: default;
    display: flex;
    flex-direction: row;
    border: 1px solid #e0e0e0;
    left: 1rem;
    top: 1rem;
    align-items: center;
    align-content: center;
    padding: 0px;
    z-index: 10000;
}
</style>
