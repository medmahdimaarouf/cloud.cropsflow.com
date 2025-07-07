<script lang="ts" setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onUnmounted, ref, watch } from 'vue';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';
const { layoutConfig, layoutState, isSidebarActive } = useLayout();

// Use proper type for event listener (MouseEvent handler)
const outsideClickListener = ref<((e: MouseEvent) => void) | null>(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

// Ensure the listener is removed on unmount
onUnmounted(() => {
    unbindOutsideClickListener();
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});

function bindOutsideClickListener() {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event: MouseEvent) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive = false;
                layoutState.staticMenuMobileActive = false;
                layoutState.menuHoverActive = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

function unbindOutsideClickListener() {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event: MouseEvent): boolean {
    const target = event.target as HTMLElement | null;
    const sidebarEl = document.querySelector('.layout-sidebar') as HTMLElement | null;
    const topbarEl = document.querySelector('.layout-menu-button') as HTMLElement | null;

    if (!sidebarEl || !topbarEl || !target) return false;

    return !(sidebarEl === target || sidebarEl.contains(target) || topbarEl === target || topbarEl.contains(target));
}
</script>

<template>
    <div class="layout-wrapper sidebar-compact" :class="containerClass">
        <app-topbar></app-topbar>
        <app-sidebar></app-sidebar>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view></router-view>
            </div>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>
