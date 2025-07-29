<script lang="ts" setup>
import ToggleSwitch from 'primevue/toggleswitch';
</script>
<template>
    <div class="flex flex-col align-items-center gap-2 w-full">
        <div class="flex flex-row items-center justify-between gap-2">
            <div class="flex flex-row items-center gap-2">
                <span class="font-bold p-m-0">Property name</span>
                <i class="pi pi-question-circle text-gray-500 p-mb-2 cursor-pointer"></i>
            </div>
            <ToggleSwitch :size="'large'" aria-labelledby="Activate" />
        </div>
        <span class="text-sm hidden">Validation message</span>
    </div>
</template>
