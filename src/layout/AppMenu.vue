<script lang="ts" setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

type MenuItem = {
    label?: string;
    icon?: string;
    to?: string;
    routerLink?: string[];
    items?: MenuItem[];
    separator?: boolean;
};

const model = ref<MenuItem[]>([
    {
        label: 'app',
        routerLink: ['/'],
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                to: '/'
            },
            {
                label: 'Studio ',
                icon: 'pi pi-fw pi-palette',
                to: '/studio'
            },
            {
                label: 'Monitoring',
                icon: 'pi pi-fw pi-gauge',
                routerLink: ['/monitor']
            },
            {
                label: 'Orchestrator',
                icon: 'pi pi-fw pi-bolt',
                routerLink: ['/orchestrator']
            },
            {
                label: 'Event push',
                icon: 'pi pi-fw pi-megaphone',
                to: '/events'
            },
            {
                label: 'Agents',
                icon: 'pi pi-fw pi-desktop',
                routerLink: ['/agents']
            },
            {
                label: 'Data hub',
                icon: 'pi pi-fw pi-database',
                routerLink: ['/data']
            },
            {
                label: 'Buckets',
                icon: 'pi pi-fw pi-folder-open',
                routerLink: ['/storage']
            },
            {
                label: 'Plugings',
                icon: 'pi pi-fw pi-objects-column',
                routerLink: ['/plugs']
            },
            {
                label: 'Config',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/config']
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
