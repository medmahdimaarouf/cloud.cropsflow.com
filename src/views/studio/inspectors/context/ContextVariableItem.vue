<script lang="ts" setup>
import Button from 'primevue/button';
</script>
<template>
    <div class="var-row">
        <div class="flex flex-row items-center justify-between gap-2">
            <Button icon="pi pi-map" label="Variable-name-here" outlined size="small"></Button>
        </div>
        <span class="text-sm m-0">Description is here</span>
    </div>
</template>
<style lang="scss" scoped>
.var-row {
    border: 1px solid #e0e0e0;
    padding: 8px;
    border-radius: 6px;
}
</style>
