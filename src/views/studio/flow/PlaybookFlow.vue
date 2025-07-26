<script lang="ts" setup>
import { PlaybookAction, PlaybookContext, PlaybookNode, PlaybookPipe } from '@/models/playbook/playbook-node';
import { Controls } from '@vue-flow/controls';
import { Node, VueFlow, useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { onMounted, ref } from 'vue';
import Action from './action/Action.vue';
import Context from './context/Context.vue';
import ContextHead from './context/ContextHead.vue';
import CustomEdge from './CustomEdge.vue';
import EndNode from './EndNode.vue';
import FlowMenu from './FlowMenu.vue';
import NextPlaceholder from './NextPlaceholder.vue';
import StarterNode from './StarterNode.vue';

const { onConnect, addEdges, setViewport, project, addNodes, viewport, dimensions } = useVueFlow();
const props = defineProps<{ context: PlaybookContext }>();
let context = ref<PlaybookContext>(props.context);

let FLOW_START_NODE: Node;
let FLOW_END_NODE: Node;

function addPlaybookContextVueFlowNode(child: PlaybookContext, childContext?: PlaybookContext, previous?: Node | string, next?: Node | string): Node {
    const previousNodeId: string = (typeof previous == 'string' ? previous : previous?.id) || FLOW_START_NODE.id;
    const nextId: string = (typeof next == 'string' ? next : next?.id) || FLOW_START_NODE.id;
    const CONTEXT_NODE: Node = {
        id: child.id,
        type: 'context',
        parentNode: childContext?.id,
        expandParent: !!childContext,
        position: { x: 0, y: 0 },
        data: {
            node: child,
            previousNode: previousNodeId
        },
        draggable: true,
        selectable: true,
        width: 380,
        height: 140,
        style: {
            display: 'flex',
            flexDirection: 'column',
            borderRadius: ' 8px',
            backgroundColor: '#ffff',
            margin: '0px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: -1
        }
    };
    addNodes(CONTEXT_NODE);
    addEdges({
        id: `${child.id}-previous`,
        type: 'custom',
        source: previousNodeId,
        target: child.id
    });
    return CONTEXT_NODE;
}

function addPlaybookActionVueFlowNode(child: PlaybookAction, childContext?: PlaybookContext, previous?: Node | string, next?: Node | string): PlaybookAction {
    const previousNodeId: string = (typeof previous == 'string' ? previous : previous?.id) || FLOW_START_NODE.id;
    const nextId: string = (typeof next == 'string' ? next : next?.id) || FLOW_START_NODE.id;

    const ACTION_NODE: Node = {
        id: child.id,
        width: 280,
        position: { x: 0, y: 0 },
        type: 'action',
        draggable: true,
        selectable: true,
        data: {
            node: child,
            previousNode: previousNodeId
        }
    };

    addNodes(ACTION_NODE);
    addEdges({
        id: `${child.id}-previous`,
        type: 'custom',
        source: previousNodeId,
        target: child.id
    });

    return child;
}

function addPlaybookPipeVueFlowNode(child: PlaybookPipe, childContext?: PlaybookContext, previous?: Node | string, next?: Node | string): PlaybookPipe {
    addNodes({
        id: child.id,
        parentNode: child.context?.id,
        expandParent: !!child.context,
        width: 280,
        position: { x: 0, y: 0 },
        type: 'pipe',
        data: {
            node: child,
            previousNode: previous
        },
        style: {
            backgroundColor: '#ffff'
        }
    });
    return child;
}

function addChildNode(child: PlaybookNode, childContext?: PlaybookContext, previous?: Node | string, next?: Node | string) {
    if (child instanceof PlaybookContext) addPlaybookContextVueFlowNode(child, childContext, previous, next);
    if (child instanceof PlaybookAction) addPlaybookActionVueFlowNode(child, childContext, previous, next);
    if (child instanceof PlaybookPipe) addPlaybookPipeVueFlowNode(child, childContext, previous, next);
}
function onNextRequested(previousNode: string, childContext?: PlaybookContext, index?: number): void {
    const next = new PlaybookContext(
        {
            id: Date.now().toString(),
            name: 'Simple Action',
            className: 'SimpleAction',
            selector: 'action-selector'
        },
        childContext
    );
    if (childContext) context.value.append(childContext);
    else context.value.append(next);
    addChildNode(next, childContext, previousNode);
}
function createFirst() {
    onNextRequested(FLOW_START_NODE.id);
}
function initVueFlow(): void {
    FLOW_START_NODE = {
        id: 'start',
        type: 'start',
        data: {},
        draggable: false,
        selectable: false,
        width: 38,
        position: {
            x: dimensions.value.width / 2 - viewport.value.x / viewport.value.zoom - 19,
            y: 10
        }
    };

    FLOW_END_NODE = {
        id: 'end',
        type: 'end',
        data: {},
        draggable: true,
        selectable: false,
        width: 38,
        position: {
            x: dimensions.value.width / 2 - viewport.value.x / viewport.value.zoom - 19,
            y: dimensions.value.height - 50
        }
    };

    addNodes([FLOW_START_NODE]);
}

onMounted(() => {
    initVueFlow();
});

function focusContext(focusContext: PlaybookContext) {
    console.log(focusContext);
    //context.value = focusContext;
}
</script>

<template>
    <div class="playbook-flow">
        <div class="flex flex-center content-center items-center gap-2 cursor-pointer px-4 py-2">
            <Avatar icon="pi pi-sitemap" size="large" />
            <div>
                <span class="text-xl font-bold m-0">{{ context.name }}</span>
                <p>{{ context.className }}</p>
            </div>
        </div>
        <div class="flow">
            <div v-if="!context.children.length" style="width: 100%; top: 80px; display: flex; align-content: center; align-items: center; justify-content: center; justify-items: center; height: 120px; z-index: 1000; position: absolute">
                <Button @click="createFirst" class="bg-white" icon="pi pi-plus-circle" size="large" label="Click to add first step" :severity="'secondary'" outlined raised></Button>
            </div>
            <VueFlow :default-zoom="40" :default-position="[0, 0]" :fit-view-on-init="false" :default-edge-options="{ type: 'step' }" :max-zoom="40" :min-zoom="-40">
                <!--<Background pattern-color="#aaa" :gap="4" />-->
                <FlowMenu></FlowMenu>

                <MiniMap style="background-color: #ffffff" />

                <Controls />
                <template #node-start="nodeProps">
                    <StarterNode v-bind="nodeProps" />
                </template>
                <template #node-end="nodeProps">
                    <EndNode v-bind="nodeProps" />
                </template>

                <template #node-placeholder="nodeProps">
                    <NextPlaceholder :context="nodeProps.data.context" :node="nodeProps.data.node" @on-next="onNextRequested"></NextPlaceholder>
                </template>

                <template #node-action="nodeProps">
                    <Action :previousNode="nodeProps.data.previousNode" :node="nodeProps.data.node" />
                </template>

                <template #node-context="nodeProps">
                    <Context @focus="focusContext" :previousNode="nodeProps.data.previousNode" :node="nodeProps.data.node" />
                </template>
                <template #edge-custom="edgeProps">
                    <CustomEdge v-bind="edgeProps"></CustomEdge>
                </template>
                <template #node-context-head="nodeProps">
                    <ContextHead :node="nodeProps.data" v-bind="nodeProps" />
                </template>
            </VueFlow>
        </div>
    </div>
</template>
<style lang="scss" scoped>
/*   DO NOT TOUCH   */
.playbook-flow {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
    height: 100%;
    > div {
        border-bottom: 1px solid rgba(170, 170, 170, 0.37);
    }
    .flow {
        position: relative;
        background-color: red;
        flex: 1;
        height: 100%;
        width: 100%;
        background-color: rgba(223, 221, 221, 0.37);
    }
}
</style>
