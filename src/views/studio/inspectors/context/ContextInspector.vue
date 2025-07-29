<script lang="ts" setup>
import Divider from 'primevue/divider';
import ContextCommandForm from './ContextCommandForm.vue';
import ContextVariableItem from './ContextVariableItem.vue';
</script>
<template>
    <div class="p-2">
        <div class="flex flex-center content-center items-center gap-2 cursor-pointer w-full">
            <Avatar icon="pi pi-sitemap" size="medium" />
            <div>
                <span class="text-xl font-bold m-0">Simple Action</span>
            </div>
        </div>
        <Divider></Divider>
        <span class="text-xl font-bold m-0 mt-4">Commands</span>
        <div class="flex flex-col mt-2 p-2">
            <ContextCommandForm></ContextCommandForm>
            <ContextCommandForm class="mt-2"></ContextCommandForm>
            <ContextCommandForm class="mt-2"></ContextCommandForm>
        </div>
        <Divider></Divider>
        <span class="text-xl font-bold mt-4">Variables</span>
        <div class="flex flex-col align-items-center mt-4 gap-2 w-full">
            <ContextVariableItem></ContextVariableItem>
            <ContextVariableItem></ContextVariableItem>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.context-inspector {
    min-width: 380px;
}
</style>
