import { ActionNode, ContextNode } from '@/models/playbook';

function toPascalCase(str: string): string {
    return str
        .split(/[-_]/g)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
}

function getClassName(selector: string): string {
    return `myproject.actions.${toPascalCase(selector)}`;
}

function generateId(selector: string): string {
    return selector + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// ROOT
const mongoCreateDataset = new ContextNode({
    id: generateId('mongo-create-dataset-action'),
    selector: 'mongo-create-dataset-action',
    name: toPascalCase('mongo-create-dataset-action'),
    icon: '',
    className: getClassName('mongo-create-dataset-action')
});

// LEVEL 1
const httpGet = new ContextNode({
    id: generateId('http-get'),
    selector: 'http-get',
    name: toPascalCase('http-get'),
    icon: '',
    className: getClassName('http-get')
});
mongoCreateDataset.append(httpGet);

// LEVEL 2
const httpHtmlResponse = new ContextNode({
    id: generateId('http-html-response'),
    selector: 'http-html-response',
    name: toPascalCase('http-html-response'),
    icon: '',
    className: getClassName('http-html-response')
});
httpGet.append(httpHtmlResponse);

// LEVEL 3
const htmlSelectAll = new ContextNode({
    id: generateId('html-select-all'),
    selector: 'html-select-all',
    name: toPascalCase('html-select-all'),
    icon: '',
    className: getClassName('html-select-all')
});
httpHtmlResponse.append(htmlSelectAll);

// LEVEL 4
const mongoDatasetInsert = new ContextNode({
    id: generateId('mongo-dataset-insert-pipe'),
    selector: 'mongo-dataset-insert-pipe',
    name: toPascalCase('mongo-dataset-insert-pipe'),
    icon: '',
    className: getClassName('mongo-dataset-insert-pipe')
});
htmlSelectAll.append(mongoDatasetInsert);

// LEVEL 5 — HTTP FETCH brand link
const brandFetch = new ContextNode({
    id: generateId('http-fetch-link-action'),
    selector: 'http-fetch-link-action',
    name: toPascalCase('http-fetch-link-action'),
    icon: '',
    className: getClassName('http-fetch-link-action')
});
mongoDatasetInsert.append(brandFetch);

// LEVEL 6
const brandResponse = new ContextNode({
    id: generateId('http-html-response'),
    selector: 'http-html-response',
    name: toPascalCase('http-html-response'),
    icon: '',
    className: getClassName('http-html-response')
});
brandFetch.append(brandResponse);

// LEVEL 7
const brandSelectAll = new ContextNode({
    id: generateId('html-select-all'),
    selector: 'html-select-all',
    name: toPascalCase('html-select-all'),
    icon: '',
    className: getClassName('html-select-all')
});
brandResponse.append(brandSelectAll);

// LEVEL 8 — HTTP FETCH model
const modelFetch = new ContextNode({
    id: generateId('http-fetch-link-action'),
    selector: 'http-fetch-link-action',
    name: toPascalCase('http-fetch-link-action'),
    icon: '',
    className: getClassName('http-fetch-link-action')
});
brandSelectAll.append(modelFetch);

// LEVEL 9 — model response
const modelResponse = new ContextNode({
    id: generateId('http-html-response'),
    selector: 'http-html-response',
    name: toPascalCase('http-html-response'),
    icon: '',
    className: getClassName('http-html-response')
});
modelFetch.append(modelResponse);

// LEVEL 10.1 — has child: version-details
const versionDetails = new ContextNode({
    id: generateId('html-has-child'),
    selector: 'html-has-child',
    name: toPascalCase('html-has-child'),
    icon: '',
    className: getClassName('html-has-child')
});
modelResponse.append(versionDetails);

// LEVEL 11.1 — map inside version-details
const versionMap = new ContextNode({
    id: generateId('map'),
    selector: 'map',
    name: toPascalCase('map'),
    icon: '',
    className: getClassName('map')
});
versionDetails.append(versionMap);

// LEAVES: html-get-attribute and html-get-text-content (inside map)
['html-get-attribute', 'html-get-attribute', 'html-get-attribute', 'html-get-attribute', 'html-get-attribute', 'html-get-text-content', 'html-get-attribute', 'html-get-text-content'].forEach((sel) => {
    const leaf = new ActionNode({
        id: generateId(sel),
        selector: sel,
        name: toPascalCase(sel),
        icon: '',
        className: getClassName(sel)
    });
    versionMap.append(leaf);
});

// LEVEL 10.2 — has-child: table.versions
const tableVersions = new ContextNode({
    id: generateId('html-has-child'),
    selector: 'html-has-child',
    name: toPascalCase('html-has-child'),
    icon: '',
    className: getClassName('html-has-child')
});
modelResponse.append(tableVersions);

// LEVEL 11.2 — html-select-all inside
const selectAllVersions = new ContextNode({
    id: generateId('html-select-all'),
    selector: 'html-select-all',
    name: toPascalCase('html-select-all'),
    icon: '',
    className: getClassName('html-select-all')
});
tableVersions.append(selectAllVersions);

// LEVEL 12 — http-fetch-link-action
const fetchInsideTable = new ContextNode({
    id: generateId('http-fetch-link-action'),
    selector: 'http-fetch-link-action',
    name: toPascalCase('http-fetch-link-action'),
    icon: '',
    className: getClassName('http-fetch-link-action')
});
selectAllVersions.append(fetchInsideTable);

// LEVEL 13 — response
const responseInTable = new ContextNode({
    id: generateId('http-html-response'),
    selector: 'http-html-response',
    name: toPascalCase('http-html-response'),
    icon: '',
    className: getClassName('http-html-response')
});
fetchInsideTable.append(responseInTable);

// LEVEL 14 — map
const mapInTable = new ContextNode({
    id: generateId('map'),
    selector: 'map',
    name: toPascalCase('map'),
    icon: '',
    className: getClassName('map')
});
responseInTable.append(mapInTable);

// LEAVES inside table map
['html-get-attribute', 'html-get-attribute', 'html-get-attribute', 'html-get-attribute', 'html-get-attribute', 'html-get-text-content'].forEach((sel) => {
    const leaf = new ActionNode({
        id: generateId(sel),
        selector: sel,
        name: toPascalCase(sel),
        icon: '',
        className: getClassName(sel)
    });
    mapInTable.append(leaf);
});
export function GET_ROOT_NODE(): ContextNode {
    return mongoCreateDataset;
}
