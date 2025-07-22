<script lang="ts" setup>
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core';
import { onMounted } from 'vue';
const { viewport, dimensions, updateNode } = useVueFlow();
const { node } = useNode();

onMounted(() => {});
</script>

<template>
    <div style="cursor: pointer; position: static">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="38px" width="38px" version="1.1" id="Capa_1" viewBox="0 0 18 18" xml:space="preserve">
            <g>
                <path
                    style="fill: #0303039f"
                    d="M13,14c0,2.209-1.791,4-4,4s-4-1.791-4-4c0-1.872,1.291-3.43,3.027-3.867   C8.021,10.088,8,10.047,8,10V3.414L6.707,4.707c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414l3-3   c0.391-0.391,1.023-0.391,1.414,0l3,3c0.391,0.391,0.391,1.023,0,1.414C12.512,4.902,12.256,5,12,5s-0.512-0.098-0.707-0.293   L10,3.414V10c0,0.047-0.021,0.088-0.027,0.133C11.709,10.57,13,12.128,13,14z"
                />
            </g>
        </svg>
        <span class="text-center">End</span>
        <Handle
            id="next"
            type="source"
            :position="Position.Top"
            :style="{
                backgroundColor: 'lime',
                borderRadius: '0%',
                width: '6px',
                height: '6px'
            }"
        />
    </div>
</template>

<style lang="scss" scoped>
.test {
    min-width: 32px;
    min-height: 32px;
    max-width: 32px;
    max-height: 32px;
    background-color: rgb(202, 202, 202);
}
</style>
