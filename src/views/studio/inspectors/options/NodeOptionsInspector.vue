<script lang="ts" setup>
import Divider from 'primevue/divider';
import BooleanOptionForm from './BooleanOptionForm.vue';
import OptionCommandForm from './OptionCommandForm.vue';
import TextOptionForm from './TextOptionForm.vue';
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
            <OptionCommandForm></OptionCommandForm>
            <OptionCommandForm class="mt-2"></OptionCommandForm>
            <OptionCommandForm class="mt-2"></OptionCommandForm>
        </div>
        <Divider></Divider>
        <span class="text-xl font-bold m-0 mt-4">Properties</span>
        <div class="flex flex-col mt-4 p-2">
            <TextOptionForm></TextOptionForm>
            <Divider></Divider>
            <BooleanOptionForm></BooleanOptionForm>
            <Divider></Divider>
            <TextOptionForm></TextOptionForm>
            <Divider></Divider>
            <BooleanOptionForm></BooleanOptionForm>
            <Divider></Divider>
            <BooleanOptionForm></BooleanOptionForm>
            <Divider></Divider>
            <BooleanOptionForm></BooleanOptionForm>
        </div>
    </div>
</template>
