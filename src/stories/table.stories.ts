import { LayoutModule, ResponsiveService } from 'yzy-ng';
// only once
import '!style-loader!css-loader!../../.storybook/storybook.css';
import '!style-loader!css-loader!../../dist/yzy-ng-themes/base-theme.css';
import { moduleMetadata } from '@storybook/angular';
import {
    TableModule,
    TableComponent,
    Column,
    ColumnTypes,
    YzYAction,
    YzYActionTypes,
    DropdownModule,
    FieldTypes
} from 'yzy-ng';
import { action } from '@storybook/addon-actions';

const typeOptions = [
    { label: 'Soda', value: 'soda' },
    { label: 'Water', value: 'water' },
    { label: 'Alcohol', value: 'alcohol' }
];

const columns: Column[] = [
    { name: 'Name', attribute: 'name' },
    {
        name: 'Type',
        attribute: 'type',
        type: ColumnTypes.Dropdown,
        options: typeOptions
    },
    { name: 'Color', attribute: 'color' },
    { name: 'Quantity', attribute: 'quantity', type: ColumnTypes.Number },
    { name: 'Price', attribute: 'price' },
    { name: 'Stock', attribute: 'stock', type: ColumnTypes.Number },
    { name: 'Healthy', attribute: 'isHealthy', type: ColumnTypes.Boolean },
    { name: 'Provider', attribute: 'provider' }
];
const sortableColumns = columns.map(c => ({ ...c }));
sortableColumns[0].isSortable = true;
sortableColumns[2].isSortable = true;
sortableColumns[3].isSortable = true;
sortableColumns[5].isSortable = true;

const editableColumns = columns.map(c => ({ ...c }));
editableColumns[0].editable = true;
editableColumns[1].editable = true;
editableColumns[5].editable = true;
editableColumns[6].editable = true;

const actions: YzYAction[] = [
    { name: 'read', class: 'gg-search', type: YzYActionTypes.Info },
    {
        name: 'attachment',
        class: 'gg-attachment',
        type: YzYActionTypes.Success
    },
    {
        name: 'lock',
        class: 'gg-lock',
        type: YzYActionTypes.Warning,
        disabled: true
    },
    { name: 'delete', class: 'gg-trash', type: YzYActionTypes.Error }
];

import items from './drinks.json';

export default {
    title: 'Table',
    decorators: [
        moduleMetadata({
            imports: [DropdownModule, TableModule, LayoutModule],
            providers: [ResponsiveService]
        })
    ]
};
export const simple = () => ({
    component: TableComponent,
    template: `
    <div class="demo-desktop">
    <yzy-table [columns]="columns" [items]="items" (onAdd)="onAdd($event)" (onSelect)="onSelect($event)" (onSort)="onSort($event)" (onFilter)="onFilter($event)"></yzy-table>
    </div>
    `,
    props: {
        columns,
        items,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});
export const withPaginator = () => ({
    component: TableComponent,
    template: `
    <div class="demo-desktop">
    <yzy-table [columns]="columns" [items]="items" [isPaginator]="isPaginator" (onAdd)="onAdd($event)" (onSelect)="onSelect($event)" (onSort)="onSort($event)" (onFilter)="onFilter($event)"></yzy-table>
    </div>
    `,
    props: {
        columns,
        items,
        isPaginator: true,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});
export const withSorts = () => ({
    component: TableComponent,
    template: `
    <div class="demo-desktop">
    <yzy-table [columns]="sortableColumns" [items]="items" [isPaginator]="isPaginator" (onAdd)="onAdd($event)" (onSelect)="onSelect($event)" (onSort)="onSort($event)" (onFilter)="onFilter($event)"></yzy-table>
    </div>
    `,
    props: {
        sortableColumns,
        items,
        isPaginator: true,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});
export const withLineActions = () => ({
    component: TableComponent,
    template: `
    <div class="demo-desktop">
    <yzy-table [columns]="columns" [items]="items" [isPaginator]="isPaginator" [lineActions]="lineActions" (onAdd)="onAdd($event)" (onSelect)="onSelect($event)" (onSort)="onSort($event)" (onFilter)="onFilter($event)"></yzy-table>
    </div>
    `,
    props: {
        columns,
        items,
        isPaginator: true,
        lineActions: actions,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});
export const withEditableCells = () => ({
    component: TableComponent,
    template: `
    <div class="demo-desktop">
    <yzy-table [columns]="editableColumns" [items]="items" [isPaginator]="isPaginator" [lineActions]="lineActions" (onAdd)="onAdd($event)" (onSelect)="onSelect($event)" (onSort)="onSort($event)" (onFilter)="onFilter($event)"></yzy-table>
    </div>
    `,
    props: {
        editableColumns,
        items,
        isPaginator: true,
        lineActions: actions,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});

const customStylesColumns = columns.map(c => ({ ...c }));
customStylesColumns[5].customStyles = value => {
    if (value > 250) {
        return {
            background: 'rgba(68, 162, 93, 0.89)',
            color: 'white',
            'border-color': 'rgba(68, 162, 93, 0.90)'
        };
    } else if (value >= 100) {
        return {
            background: 'rgba(68, 162, 93, 0.66)',
            color: 'white',
            'border-color': 'rgba(68, 162, 93, 0.66)'
        };
    } else {
        return {
            background: 'rgba(227, 119, 67, 0.72)',
            color: 'white',
            'border-color': 'rgba(227, 119, 67, 0.72)'
        };
    }
    return {};
};
export const withCustomStylesForCells = () => ({
    component: TableComponent,
    template: `
    <div class="demo-desktop">
    <yzy-table [columns]="customStylesColumns" [items]="items" [isPaginator]="isPaginator" [lineActions]="lineActions" (onAdd)="onAdd($event)" (onSelect)="onSelect($event)" (onSort)="onSort($event)" (onFilter)="onFilter($event)"></yzy-table>
    </div>
    `,
    props: {
        customStylesColumns,
        items,
        isPaginator: true,
        lineActions: actions,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});
export const responsive = () => ({
    component: TableComponent,
    template: `
    <div class="demo-smartphone">
    <yzy-table [columns]="columns" [items]="items" [isPaginator]="isPaginator" (onAdd)="onAdd($event)" (onSelect)="onSelect($event)" (onSort)="onSort($event)" (onFilter)="onFilter($event)"></yzy-table>
    </div>
    `,
    props: {
        columns,
        items,
        footerOptions: {
            sortPanel: true,
            searchPanel: true,
            addButton: true
        },
        isPaginator: true,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});

const actionsForComplete: YzYAction[] = [
    { name: 'add', class: 'gg-math-plus', type: YzYActionTypes.Success },
    { name: 'save', class: 'gg-check', type: YzYActionTypes.Warning },
    { name: 'back', class: 'gg-chevron-left', type: YzYActionTypes.Info }
];
const formModel = {
    title: null,
    fields: [
        {
            type: FieldTypes.Dropdown,
            name: 'type',
            label: 'Type',
            options: typeOptions
        },
        {
            type: FieldTypes.Text,
            name: 'provider',
            label: 'Provider'
        },
        {
            type: FieldTypes.Checkbox,
            name: 'isHealthy',
            label: 'Healthy'
        }
    ]
};

const completesColumn = editableColumns.map(c => ({ ...c }));
completesColumn[0].isSortable = true;
completesColumn[2].isSortable = true;
completesColumn[3].isSortable = true;
completesColumn[5].isSortable = true;

export const complete = () => ({
    template: `
    <yzy-bar [title]="title" [actions]="actionsForComplete" (action)="action($event)"></yzy-bar>
    <yzy-bar [formModel]="formModel"></yzy-bar>
    <yzy-table [columns]="completesColumn" [items]="items" [isPaginator]="isPaginator" [lineActions]="lineActions" (onAdd)="onAdd($event)" (onSelect)="onSelect($event)" (onSort)="onSort($event)" (onFilter)="onFilter($event)"></yzy-table>
    `,
    props: {
        title: 'Complete table',
        actionsForComplete,
        formModel,
        completesColumn,
        items,
        isPaginator: true,
        lineActions: actions,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});
