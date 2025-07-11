<script lang="ts" setup>
import '@vue-flow/core/dist/style.css';
import Button from 'primevue/button';
import { useRoute } from 'vue-router';
import PlaybookFlow from './flow/PlaybookFlow.vue';

const route = useRoute();
const id = route.params.id as string;
</script>

<template>
    <div class="studio-layout">
        <!-- Top toolbar -->
        <div class="studio-toolbar top">
            <div class="flex flex-center items-center gap-2 flex-1">
                <Button icon="pi pi-home" v-tooltip="'Return to home'" severity="secondary" variant="text" class="cursor-pointer" />
                <!--<div class="v-separator"></div>

                <div class="flex flex-center gap-2">
                    <span>Web sockets communication</span>
                </div>
-->
                <div class="v-separator"></div>

                <Button icon="pi pi-undo" v-tooltip="'Undo'" severity="secondary" variant="text" class="cursor-pointer" />
                <Button icon="pi pi-refresh" v-tooltip="'Redo'" severity="secondary" variant="text" class="cursor-pointer" />

                <div class="v-separator"></div>

                <Button icon="pi pi-play-circle" label="Test" severity="secondary" class="cursor-pointer" />
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
                <Button icon="pi pi-folder-open" v-tooltip="'Project folders'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                <Button icon="pi pi-box" v-tooltip="'Modules'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                <Button icon="pi pi-info-circle" v-tooltip="'Issues'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                <Button icon="pi pi-clock" v-tooltip="'History'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                <Button icon="pi pi-code" v-tooltip="'Template code'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
            </div>

            <div class="studio-panel left"></div>

            <div class="studio-flow">
                <PlaybookFlow />
            </div>

            <div class="studio-panel right"></div>

            <div class="studio-toolbar right">
                <Button icon="pi pi-wrench" v-tooltip="'Configuration'" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                <Button icon="pi pi-info-circle" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                <Button icon="pi pi-clock" size="large" variant="text" severity="secondary" class="cursor-pointer" />
                <Button icon="pi pi-box" size="large" variant="text" severity="secondary" class="cursor-pointer" />
            </div>
        </div>

        <!-- Bottom panel -->
        <div class="studio-static-panel"></div>
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
    height: calc(100vh - 4rem);

    .studio-toolbar.top {
        width: 100%;
        height: 3rem;
        margin: 4px 0;
        border-bottom: 1px solid rgba(170, 170, 170, 0.37);
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 8px;
    }

    .studio-toolbar.left,
    .studio-toolbar.right {
        height: 100%;
        width: 3.5rem;
        background-color: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 8px;
    }

    .studio-toolbar.left {
        border-right: 1px solid rgba(170, 170, 170, 0.37);
    }

    .studio-toolbar.right {
        border-left: 1px solid rgba(170, 170, 170, 0.37);
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
        min-width: 400px;
        display: none;

        &.active {
            display: block;
        }

        &.left {
            border-right: 1px solid rgba(170, 170, 170, 0.37);
        }

        &.right {
            border-left: 1px solid rgba(170, 170, 170, 0.37);
        }
    }

    .studio-static-panel {
        height: 2.5rem;
        width: 100%;
        border-top: 1px solid rgba(170, 170, 170, 0.37);
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
</style>
