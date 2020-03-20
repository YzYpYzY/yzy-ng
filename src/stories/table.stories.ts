// only once
import '!style-loader!css-loader!../../.storybook/storybook.css';
import '!style-loader!css-loader!../../dist/yzy-ng-themes/base-theme.css';

import { moduleMetadata } from '@storybook/angular';
import { TableModule, TableComponent, Column, ColumnTypes } from 'yzy-ng';
import { action } from '@storybook/addon-actions';

const typeOptions = [
    { label: 'Soda', value: 'soda' },
    { label: 'Water', value: 'water' },
    { label: 'Alcohol', value: 'alcohol' }
];

const columns: Column[] = [
    { name: 'Name', attribute: 'name', editable: true },
    {
        name: 'Type',
        attribute: 'type',
        type: ColumnTypes.Dropdown,
        editable: true,
        options: typeOptions
    },
    { name: 'Color', attribute: 'color' },
    { name: 'Quantity', attribute: 'quantity', type: ColumnTypes.Number },
    { name: 'Price', attribute: 'price' },
    { name: 'Stock', attribute: 'stock', type: ColumnTypes.Number },
    { name: 'Provider', attribute: 'provider'}
];
import items from './drinks.json';

export default {
    title: 'Table',
    decorators: [
        moduleMetadata({
            imports: [TableModule]
        })
    ]
};
export const simple = () => ({
    component: TableComponent,
    template: `
    <div class="demo-desktop">
    <yzy-table class="s-desktop"[columns]="columns" [items]="items" [isPaginator]="isPaginator" (onAdd)="onAdd($event)" (onSelect)="onSelect($event)" (onSort)="onSort($event)" (onFilter)="onFilter($event)"></yzy-table>
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
        isPaginator: true,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});
