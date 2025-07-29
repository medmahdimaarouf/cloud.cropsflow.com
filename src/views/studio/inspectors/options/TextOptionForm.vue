<script lang="ts" setup>
import InputText from 'primevue/inputtext';
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-col sm:flex-row items-center gap-2">
            <span class="font-bold p-m-0">Property name</span>
            <i class="pi pi-question-circle text-gray-500 p-mb-2 cursor-pointer"></i>
        </div>
        <InputText type="text" placeholder="Name" />
        <span class="text-sm hidden">Validation message</span>
    </div>
</template>
