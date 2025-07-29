<script lang="ts" setup>
import { IPlaybookNode, PlaybookAction, PlaybookContext, PlaybookNode, PlaybookPipe } from '@/models/playbook';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import { inject } from 'vue';

const dialogRef: any = inject('dialogRef');

const emit = defineEmits<{ (e: 'on-selected-component', component: IPlaybookNode): void }>();

function onSelectedComponent(component: { id: string; name: string; context: string; type: 'context' | 'action' | 'pipe' }) {
    let node: PlaybookNode;
    if (component.type == 'action') {
        node = new PlaybookAction({
            name: component.name,
            className: `package.components.${component.type}`,
            selector: component.type,
            id: Date.now().toString()
        });
    }
    if (component.type == 'pipe') {
        node = new PlaybookPipe({
            name: component.name,
            className: `package.components.${component.type}`,
            selector: component.type,
            id: Date.now().toString()
        });
    }
    if (component.type == 'context') {
        node = new PlaybookContext({
            name: component.name,
            className: `package.components.${component.type}`,
            selector: component.type,
            id: Date.now().toString()
        });
    }
    emit('on-selected-component', node!);
    dialogRef.value.close(node!);
}
const installedPackages: Array<{
    name: string;
    icon?: string;
    version: string;
    owner?: string;
}> = [
    {
        name: 'Common',
        version: '1.0'
    },
    {
        name: 'Gmail',
        version: '1.0'
    },
    {
        name: 'Mongo',
        version: '1.0'
    },
    {
        name: 'Facebook',
        version: '1.0'
    }
];

const selectedPackageComponents: Array<{ id: string; name: string; context: string; type: 'context' | 'action' | 'pipe' }> = [
    {
        id: '1',
        name: 'Simple Action',
        context: 'Action context',
        type: 'action'
    },
    {
        id: '2',
        name: 'Simple Pipe',
        context: 'Pipe context',
        type: 'pipe'
    },
    {
        id: '3',
        name: 'Simple Context ',
        context: 'Simple context',
        type: 'context'
    }
];
</script>
<template>
    <Tabs value="0">
        <TabList>
            <Tab value="0">
                <div class="flex items-center gap-2 text-inherit">
                    <i class="pi pi-box"></i>
                    <span>Packages</span>
                </div>
            </Tab>
            <Tab value="1">
                <div class="flex items-center gap-2 text-inherit">
                    <i class="pi pi-shopping-cart"></i>
                    <span>Store</span>
                </div>
            </Tab>
        </TabList>
        <TabPanels class="p-0">
            <TabPanel value="0">
                <div class="flex flex-center context-center gap-2 h-full">
                    <div class="package-list py-4 px-2">
                        <div class="flex-center flex flex-col gap-2">
                            <div v-for="p of installedPackages" class="package flex flex-row sm:items-center gap-2 py-2 cursor-pointer">
                                <Avatar icon="pi pi-sitemap" size="large" />
                                <div>
                                    <span class="font-bold m-0">{{ p.name }}</span>
                                    <p>{{ p.version }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 mx-2 w-full">
                        <div class="grid w-full">
                            <div v-for="component of selectedPackageComponents" class="col-4 md:col-6 lg:col-4" @click="onSelectedComponent(component)">
                                <div class="flex flex-row sm:items-center gap-2 py-2 cursor-pointer">
                                    <Avatar icon="pi pi-sitemap" size="large" />
                                    <div>
                                        <span class="font-bold m-0">{{ component.name }}</span>
                                        <p>{{ component.type }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value="1">
                <p class="m-0">Store is not available right now!</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>
<style lang="scss" scoped>
.p-tabpanels {
    width: 100%;
    height: 100% !important;
    padding: 0px;
    margin: 0px;
    flex: 1;
}

.package-list {
    border-right: 1px solid #e0e0e0;
    width: 240px;
}

.package {
    border: 1px solid #e0e0e0;
    padding: 4px 2px;
    border-radius: 6px;
    box-shadow: '0 2px 8px rgba(0, 0, 0, 0.1)';
}
.package:hover {
    /*box-shadow:
        4px 8px 10.1px -2.5px rgba(63, 71, 93, 0.12),
        1.7px 3.3px 4.2px -1.7px rgba(63, 71, 93, 0.13),
        0.7px 1.4px 1.8px -0.8px rgba(63, 71, 93, 0.14),
        0.3px 0.5px 0.7px 0px rgba(63, 71, 93, 0.15);
        */
    border: 2px solid #e0e0e0;
}
</style>
