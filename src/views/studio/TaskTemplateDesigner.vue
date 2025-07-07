<template>
    <div class="studio-layout">
        <div class="studio-toolbar top">
            <div class="flex flex-center items-center gap-2 flex-1">
                <Button icon="pi pi-home" v-tooltip.bottom="'Return to home'" size="medium" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <div class="v-separator"></div>
                <div class="flex flex-center gap-2">
                    <span>Web sockets communication</span>
                </div>
                <div class="v-separator"></div>
                <Button icon="pi pi-undo" v-tooltip.bottom="'Undo'" size="medium" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-refresh" v-tooltip.bottom="'Redo'" size="medium" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <div class="v-separator"></div>
                <Button icon="pi pi-play-circle" label="Test" size="medium" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-play-circle" label="Test step by step" size="medium" severity="secondary" class="cursor-pointer"></Button>
            </div>
            <div class="flex justify-content-center align-items-end gap-2 mr-4">
                <Button icon="pi pi-cloud-upload" label="Pusblish" size="medium" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-share-alt" label="Share" size="medium" severity="secondary" class="cursor-pointer"></Button>
            </div>
        </div>
        <div class="studio-main">
            <div class="studio-toolbar left">
                <Button icon="pi pi-folder-open" v-tooltip.right="'Project folders'" size="large" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-box" v-tooltip.right="'Modules'" size="large" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-info-circle" v-tooltip.right="'Issues'" size="large" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-clock" v-tooltip.right="'History'" size="large" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-code" v-tooltip.right="'Template code'" size="large" variant="text" severity="secondary" class="cursor-pointer"></Button>
            </div>
            <div class="studio-panel left"></div>
            <div class="studio-flow">
                <PlaybookFlow></PlaybookFlow>
            </div>
            <div class="studio-panel right"></div>
            <div class="studio-toolbar right">
                <Button icon="pi pi-wrench" v-tooltip.left="'Configuration'" size="large" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-info-circle" size="large" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-clock" size="large" variant="text" severity="secondary" class="cursor-pointer"></Button>
                <Button icon="pi pi-box" size="large" variant="text" severity="secondary" class="cursor-pointer"></Button>
            </div>
        </div>
        <div class="studio-static-panel"></div>
    </div>
</template>

<script setup>
import '@vue-flow/core/dist/style.css';
import Button from 'primevue/button';
import { useRoute } from 'vue-router';
import PlaybookFlow from './flow/PlaybookFlow.vue';

const route = useRoute();
const id = route.params.id;
</script>

<style lang="scss" scoped>
.studio-layout {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* take all remaining space */
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 4rem);

    .studio-toolbar.top {
        width: 100%;
        height: 3rem;
        margin: 4px 0px;
        border-bottom: 1px solid rgba(170, 170, 170, 0.37);
        display: flex;
        flex-wrap: nowrap;
        align-content: space-between;
        align-items: center;
        margin: 0px 4px;
        gap: 12px;
    }

    .studio-toolbar.left {
        height: 100%;
        width: 3.5rem;
        background-color: transparent;
        border-right: 1px solid rgba(170, 170, 170, 0.37);

        display: flex;
        align-items: center;
        align-content: center;
        flex-direction: column;
        padding-top: 8px;
    }

    .studio-toolbar.right {
        height: 100%;
        width: 3.5rem;
        background-color: transparent;
        border-left: 1px solid rgba(170, 170, 170, 0.37);

        display: flex;
        align-items: center;
        align-content: center;
        flex-direction: column;

        padding-top: 8px;
    }

    .studio-main {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;
        align-content: stretch;
        gap: 0px;
        width: 100%;
        padding: 0px;
        margin: 0px;
        flex-grow: 1;
        overflow: auto;
    }

    .studio-flow {
        flex: 1;
        width: 100%;
        flex-grow: 1;
        overflow: auto;
    }

    .studio-panel {
        min-width: 400px;
        display: none;
    }

    .studio-panel.active {
        display: block;
    }
    .studio-panel.left {
        border-right: 1px solid rgba(170, 170, 170, 0.37);
    }
    .studio-panel.right {
        border-left: 1px solid rgba(170, 170, 170, 0.37);
    }

    .studio-static-panel {
        height: 2.5rem;
        widows: 100%;
        bottom: 0;
        position: static;
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
