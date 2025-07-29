<script lang="ts" setup>
import { useLayout } from '@/layout/composables/layout';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <!--<svg viewBox="0 0 956.815 956.815" width="32px" height="32px" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M 132.621 162.622 L 15 162.622 C 3.954 162.622 132.622 275.541 132.622 275.541 L 132.621 162.622 Z" style="fill: rgb(40, 147, 247)" />
                        <path d="M 761.274 918.814 C 761.274 929.86 874.193 801.193 874.193 801.193 L 761.274 801.193 L 761.274 918.814 Z" style="fill: rgb(40, 147, 247)" />
                        <path d="M 874.193 669.626 L 874.193 182.622 C 874.193 171.576 865.239 162.622 854.193 162.622 L 262.607 162.622 L 262.607 275.541 L 761.274 275.541 L 761.274 669.626 L 874.193 669.626 Z" style="fill: rgb(40, 147, 247)" />
                        <path
                            d="M 874.536 682.388 L 774.193 681.275 L 661.274 681.275 L 255.54 681.275 L 255.54 275.541 L 255.54 162.622 L 255.54 20 C 255.54 8.954 142.622 151.363 142.622 162.409 L 142.622 162.622 L 142.622 275.541 L 142.622 774.194 C 142.622 785.24 151.576 794.194 162.622 794.194 L 661.275 794.194 L 774.193 794.194 L 940.179 794.194 C 951.224 794.194 885.582 682.388 874.536 682.388 Z"
                            style="fill: rgb(40, 147, 247)"
                        />
                    </g>
                    <g transform="matrix(1, 0, 0, 1, 243.546402, 255.784744)">
                        <polygon class="st0" points="292.195 65.443 189.721 223.172 243.172 272.125 206.253 382.742 325.789 246.603 258.825 198.763" style="fill: var(--primary-color)" />
                    </g>
                </svg>
            -->
                <span style="font-weight: 800">Crops<span style="font-style: italic">Flow</span></span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <!--
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
                -->
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
