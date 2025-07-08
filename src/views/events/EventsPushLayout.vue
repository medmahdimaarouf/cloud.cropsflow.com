<script lang="ts" setup>
import Button from 'primevue/button';
import TabPanel from 'primevue/tabpanel';
import { ref } from 'vue';

import DataTable from 'primevue/datatable';

const tabs = ref([
    { title: 'Workspace', content: 'Tab 1 Content', value: '0' },
    { title: 'Templates', content: 'Tab 2 Content', value: '1' }
]);
</script>

<template>
    <div class="container-fluid m-4">
        <div class="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div class="flex flex-col sm:flex-row items-center gap-4">
                <span class="text-xl font-bold p-m-0">Event Channels</span>
                <i class="pi pi-question-circle text-gray-500 p-mb-2 cursor-pointer"></i>
            </div>
            <div class="flex items-center gap-2 sm:ml-auto">
                <Button label="API" icon="pi pi-code" variant="outlined"></Button>
                <Button label="Create Channel" icon="pi pi-plus"></Button>
            </div>
        </div>
        <DataTable :value="[]" :rows="10" :row-hover="true" :paginator="true" :show-gridlines="true">
            <Column field="id" header="Id" sortable></Column>
            <Column field="name" header="Name" sortable></Column>
            <Column field="date" header="Date" sortable></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
            <template #empty>
                <div class="flex flex-center items-center content-center p-4" style="min-height: 200px; width: 100%">
                    <span class="text-center"> No customers found.</span>
                </div>
            </template>
        </DataTable>
        <TabView>
            <TabPanel :value="0">
                <template #header>
                    <i class="pi pi-cog mr-2"></i>
                    Settings
                </template>
                Content for tab 1
            </TabPanel>
            <TabPanel header="Tab 2" :value="1"> Content for tab 2 </TabPanel>
        </TabView>
    </div>
</template>
