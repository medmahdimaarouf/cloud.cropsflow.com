<script lang="ts" setup>
import { PlaybookContext } from '@/models/playbook';
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core';
import { defineProps, onMounted } from 'vue';

const { addNodes } = useVueFlow();

const { node: flowNode } = useNode();
const { node: playbookContext } = defineProps<{ node: PlaybookContext }>();

onMounted(() => {});
</script>

<template>
    <div class="flex flex-center content-center items-center gap-2 cursor-pointer">
        <Avatar icon="pi pi-sitemap" size="large" />
        <div>
            <span class="text-xl font-bold m-0">{{ $props.node.name }}</span>
            <p>Context Name</p>
        </div>
    </div>
    <Handle
        :id="'context-head-next'"
        :type="'source'"
        :position="Position.Bottom"
        :style="{
            backgroundColor: 'lime',
            borderRadius: '0%',
            width: '6px',
            height: '6px'
        }"
    />
</template>
