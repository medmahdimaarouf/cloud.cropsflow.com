<template>
    <DataTable :value="products" :rows="10" :row-hover="true" :paginator="true" removableSort tableStyle="min-width: 50rem">
        <Column field="name" header="Name" sortable>
            <template #body="{ data }">
                <div class="flex flex-center content-center items-center gap-2 cursor-pointer">
                    <Avatar icon="pi pi-sitemap" size="xlarge" />
                    <div>
                        <span>{{ data.name }}</span>
                        <p>{{ data.description }}</p>
                    </div>
                </div>
            </template>
        </Column>
        <Column field="owner" header="Owner" sortable></Column>
        <Column field="date" header="Created at" sortable>
            <template #body="{ data }">
                {{ new Date(data.date).toLocaleDateString() }}
            </template>
        </Column>
        <Column field="status" header="Status"></Column>
        <Column header="Actions">
            <template #body="{ data }">
                <Button icon="pi pi-pen-to-square" severity="secondary" @click="onTaskEditRequest(data.id)" rounded></Button>
            </template>
        </Column>
    </DataTable>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Avatar from 'primevue/avatar';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

// get router instance
const router = useRouter();

const products: any = ref([]);

function onTaskEditRequest(id: any) {
    router.push({ name: 'TaskTemplateDesigner', params: { id } });
}

onMounted(() => {
    products.value = [
        {
            id: '12F34-1d25-896f-545ABC',
            name: 'Web sockets communication',
            date: Date.now(),
            owner: 'Med Mahdi',
            status: 'draft',
            description: 'Make communication over websockets on custom server'
        },
        {
            id: 1,
            name: 'Authentication layer',
            date: Date.now(),
            owner: 'Med Mahdi',
            status: 'draft',
            description: 'Create user authentication and session management'
        },
        {
            id: 2,
            name: 'Monitoring feature',
            date: Date.now(),
            owner: 'Med Mahdi',
            status: 'in-progress',
            description: 'Add process and resource monitoring to dashboard'
        }
    ];
});
</script>
