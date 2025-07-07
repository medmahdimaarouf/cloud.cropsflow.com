<template>
    <div class="container-fluid">
        <div class="flex flex-col sm:flex-row items-center gap-6 m-6">
            <div class="flex flex-col sm:flex-row items-center gap-4">
                <h3>CropsFlow Studio</h3>

                <i class="pi pi-question-circle text-gray-500 p-mb-2 cursor-pointer"></i>
            </div>
            <div class="flex items-center gap-2 sm:ml-auto">
                <Button label="API" icon="pi pi-code" variant="outlined"></Button>
            </div>
        </div>
        <Tabs value="0">
            <template #header>
                <div class="text-end pb-4">
                    <Button icon="pi pi-external-link" label="Create new"></Button>
                </div>
            </template>
            <TabList>
                <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel :value="'0'">
                    <span class="text-xl font-bold p-m-0">Tasks templates</span>

                    <WorkspaceTasksTemplates class="mt-4"></WorkspaceTasksTemplates>
                </TabPanel>
                <TabPanel :value="'1'"> </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import { ref } from 'vue';
import WorkspaceTasksTemplates from './WorkspaceTasksTemplates.vue';

const tabs = ref([
    { title: 'Workspace', content: 'Tab 1 Content', value: '0' },
    { title: 'Templates', content: 'Tab 2 Content', value: '1' }
]);
</script>
