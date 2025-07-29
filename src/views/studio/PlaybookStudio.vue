<script lang="ts" setup>
import { PlaybookContext } from '@/models';
import { Playbook } from '@/service/playbook-manager.service';
import '@vue-flow/core/dist/style.css';
import Button from 'primevue/button';
import { onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import PlaybookFlow from './flow/PlaybookFlow.vue';
import NodeOptionsInspector from './inspectors/options/NodeOptionsInspector.vue';

const route = useRoute();
const id = route.params.id as string;

const playbook: Playbook = new Playbook({
    id: Date.now().toString(),
    title: 'Play book view',
    context: new PlaybookContext({
        name: 'Ai ChatGPT4',
        resolvedContext: false,
        id: Date.now().toString(),
        selector: 'playbook',
        className: 'package.module.class'
    })
});

const activeLeftPanel: Ref<String | null> = ref(null);
const activeRightPanel: Ref<String | null> = ref(null);
const activeBottomPanel: Ref<String | null> = ref(null);

function toggleLeftPanel(panelId: string): void {
    console.log('sqdqd');
    activeLeftPanel.value = activeLeftPanel.value !== panelId ? panelId : null;
    activeRightPanel.value = null;
}

function toggleRightPanel(panelId: string): void {
    activeRightPanel.value = activeRightPanel.value !== panelId ? panelId : null;
}

function toggleBottomPanel(panelId: string): void {
    activeBottomPanel.value = activeBottomPanel.value !== panelId ? panelId : null;
}

onMounted(() => {});
</script>

<template>
    <div class="studio-layout">
        <!-- Top toolbar -->
        <div class="studio-toolbar top">
            <div class="flex flex-center items-center gap-2 flex-1">
                <div class="flex flex-center gap-2 mx-2 cursor-pointer">
                    <i class="pi pi-sitemap"></i>
                    <span class="font-bold">Web sockets communication</span>
                </div>
                <div class="v-separator"></div>

                <Button icon="pi pi-undo" v-tooltip="'Undo'" severity="secondary" variant="text" class="cursor-pointer" />
                <Button icon="pi pi-refresh" v-tooltip="'Redo'" severity="secondary" variant="text" class="cursor-pointer" />

                <div class="v-separator"></div>

                <Button icon="pi pi-filter" label="Test" severity="secondary" class="cursor-pointer" />
                <Button icon="pi pi-play-circle" label="Test step by step" severity="secondary" class="cursor-pointer" />
            </div>

            <div class="flex justify-content-center align-items-end gap-2 mr-4">
                <Button icon="pi pi-cloud-upload" label="Publish" v-tooltip="'Push template to agents'" severity="secondary" class="cursor-pointer" />
                <Button icon="pi pi-share-alt" label="Share" severity="secondary" class="cursor-pointer" />
            </div>
        </div>

        <!-- Main layout -->
        <div class="studio-main">
            <div class="studio-toolbar left">
                <div>
                    <Button @click="toggleLeftPanel('2')" icon="pi pi-box" v-tooltip="'Modules'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                    <Button @click="toggleLeftPanel('5')" icon="pi pi-users" v-tooltip="'Team'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                    <Button @click="toggleLeftPanel('1')" icon="pi pi-images" v-tooltip="'Assets'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                    <Button @click="toggleLeftPanel('3')" icon="pi pi-book" v-tooltip="'Readme'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                    <Button @click="toggleLeftPanel('4')" icon="pi pi-history" v-tooltip="'History'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                </div>
                <div>
                    <Button @click="toggleBottomPanel('1')" icon="pi pi-clipboard" v-tooltip="'Log'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                    <Button @click="toggleBottomPanel('2')" icon="pi pi-desktop" v-tooltip="'Agents'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                    <Button @click="toggleBottomPanel('3')" icon="pi pi-database" v-tooltip="'Data'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                    <Button @click="toggleBottomPanel('4')" icon="pi pi-folder-open" v-tooltip="'Buckets'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                    <Button @click="toggleBottomPanel('5')" icon="pi pi-gauge" v-tooltip="'Monitor'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                </div>
            </div>

            <div class="studio-panel left" :class="{ active: activeLeftPanel !== null }" v-resizable="{ right: true }">
                <h2>Left panel</h2>
            </div>

            <div class="studio-flow">
                <PlaybookFlow :context="playbook.context" />
            </div>

            <div class="studio-panel right" :class="{ active: activeRightPanel !== null }">
                <NodeOptionsInspector v-if="activeRightPanel == '1'"> </NodeOptionsInspector>
            </div>
            <div class="studio-panel static bottom" :class="{ active: activeBottomPanel != null }" v-resizable="{ top: true }">
                <h3>Hey i am here</h3>
            </div>
            <div class="studio-toolbar right">
                <Button @click="toggleRightPanel('1')" icon="pi pi-cog" v-tooltip="'Configuration'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                <Button @click="toggleRightPanel('2')" icon="pi pi-filter" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                <Button @click="toggleRightPanel('3')" icon="pi pi-clock" size="large" variant="text" severity="secondary" class="cursor-pointer" />
            </div>
        </div>

        <!-- Bottom panel -->
        <div class="studio-status-bar">
            <div>
                <Button icon="pi pi-sitemap" size="small" label="Ai ChatGPT4" variant="text" severity="secondary" class="cursor-pointer" />
                <i size="small" class="pi pi-chevron-right"></i>
                <Button icon="pi pi-sitemap" size="small" label="Context AI" variant="text" severity="secondary" class="cursor-pointer" />
                <i size="small" class="pi pi-chevron-right"></i>
                <Button icon="pi pi-sitemap" size="small" label="Ai Deepseek" variant="text" severity="secondary" class="cursor-pointer" />
                <i size="small" class="pi pi-chevron-right"></i>
                <Button icon="pi pi-sitemap" size="small" label="Context AI" variant="text" severity="secondary" class="cursor-pointer" />
            </div>
            <div class="mx-2">
                <Button :icon="'pi ' + (true ? 'pi-bell' : 'pi-info-circle')" severity="contrast" variant="text" rounded aria-label="Star" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.studio-layout {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 3rem);

    .studio-toolbar.top {
        width: 100%;
        height: 3rem;
        margin: 0;
        border-bottom: 1px solid rgba(170, 170, 170, 0.37);
        display: flex;
        align-items: center;
        align-content: center;
        gap: 12px;
        padding: 0 8px;
    }

    .studio-toolbar.left,
    .studio-toolbar.right {
        height: 100%;
        width: 3.2rem;
        background-color: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        padding-top: 8px;
    }

    .studio-toolbar.left {
        border-right: 1px solid rgba(170, 170, 170, 0.37);
        justify-content: space-between;
    }

    .studio-toolbar.right {
        border-left: 1px solid rgba(170, 170, 170, 0.37);
    }
    .studio-toolbar.bottom {
        height: 2rem;
    }
    .studio-main {
        display: flex;
        flex: 1;
        width: 100%;
        overflow: auto;
    }

    .studio-flow {
        flex: 1;
        overflow: auto;
    }

    .studio-panel {
        min-width: 360px;
        display: none;
        background-color: #ffff;
        &.active {
            display: block;
        }

        &.left {
            border-right: 1px solid rgba(170, 170, 170, 0.37);
        }

        &.right {
            border-left: 1px solid rgba(170, 170, 170, 0.37);
            overflow-y: auto;
        }
        &.static {
            position: absolute;
        }
        &.bottom {
            bottom: 2rem;
            left: 3.2rem;
            right: 3.2rem;
            width: calc(100% - 6.4rem);
            height: 300px;
            border-top: 1px solid rgba(170, 170, 170, 0.37);
        }
    }

    .studio-status-bar {
        height: 2rem;
        width: 100%;
        border-top: 1px solid rgba(170, 170, 170, 0.37);
        display: flex;
        flex-wrap: nowrap;
        align-content: center;
        align-items: center;
        justify-content: space-between;
    }

    .v-separator {
        width: 1px;
        background-color: rgba(170, 170, 170, 0.37);
        height: 2.5rem;
        min-width: 1px;
    }

    .h-separator {
        height: 1px;
        background-color: rgba(170, 170, 170, 0.37);
        width: 100%;
    }
}

.p-button {
    border-radius: 2px;
}
</style>
