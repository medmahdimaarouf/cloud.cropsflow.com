<script lang="ts" setup>
import Button from 'primevue/button';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import PlaybooksList from './PlaybooksList.vue';
</script>
<template>
    <div class="container-fluid">
        <div class="flex flex-col sm:flex-row items-center gap-6 m-6">
            <div class="flex flex-col sm:flex-row items-center gap-4">
                <h3>CropsFlow Studio</h3>
                <i class="pi pi-question-circle text-gray-500 mb-2 cursor-pointer"></i>
            </div>
            <div class="flex items-center gap-2 sm:ml-auto">
                <Button label="API" icon="pi pi-code" outlined />
            </div>
        </div>
        <TabView>
            <template> </template>
            <TabPanel header="Workspace" :value="'1'">
                <div style="display: flex; justify-content: space-between; align-items: center">
                    <span class="text-xl font-bold m-0">Templates</span>
                    <Button icon="pi pi-external-link" label="Create new" />
                </div>
                <PlaybooksList class="mt-4" />
            </TabPanel>
            <TabPanel header="Templates" :value="'0'">
                <!-- Content for Templates tab -->
            </TabPanel>
        </TabView>
    </div>
</template>
