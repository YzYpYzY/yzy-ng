import { moduleMetadata } from '@storybook/angular';
import { TableModule, TableComponent, Column, ColumnTypes } from 'yzy-ng';
import { action } from '@storybook/addon-actions';
import '!style-loader!css-loader!../../dist/yzy-ng-themes/base-theme.css';

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
    { name: 'Color', attribute: 'color', width: 1 },
    { name: 'Quantity', attribute: 'quantity' },
    { name: 'Price', attribute: 'price' },
    { name: 'Stock', attribute: 'stock' },
    { name: 'Provider', attribute: 'provider', width: 2 }
];
const items = [
    {
        id: 0,
        name: 'Coca',
        type: 'soda',
        color: 'black',
        quantity: '4',
        price: '50€',
        stock: '250',
        provider: 'Coca-Cola'
    },
    {
        id: 1,
        name: 'Fanta',
        type: 'soda',
        color: 'black',
        quantity: '4',
        price: '50€',
        stock: '250',
        provider: 'Coca-Cola'
    },
    {
        id: 2,
        name: 'Water',
        type: 'water',
        color: 'transparent',
        quantity: '6',
        price: '50€',
        stock: '500',
        provider: 'Chaufontaine'
    },
    {
        id: 3,
        name: 'Water',
        type: 'water',
        color: 'transparent',
        quantity: '1',
        price: '5€',
        stock: '100',
        provider: 'Spa'
    },
    {
        id: 4,
        name: 'Wine',
        type: 'alcohol',
        color: 'red',
        quantity: '12',
        price: '50€',
        stock: '50',
        provider: 'Chateau neuf du pape'
    },
    {
        id: 5,
        name: 'Wine',
        type: 'alcohol',
        color: 'red',
        quantity: '2',
        price: '5€',
        stock: '50',
        provider: 'Bourgogne'
    },
    {
        id: 6,
        name: 'Coca',
        type: 'soda',
        color: 'black',
        quantity: '4',
        price: '50€',
        stock: '250',
        provider: 'Coca-Cola'
    },
    {
        id: 7,
        name: 'Fanta',
        type: 'soda',
        color: 'black',
        quantity: '4',
        price: '50€',
        stock: '250',
        provider: 'Coca-Cola'
    },
    {
        id: 8,
        name: 'Water',
        type: 'water',
        color: 'transparent',
        quantity: '6',
        price: '50€',
        stock: '500',
        provider: 'Chaufontaine'
    },
    {
        id: 9,
        name: 'Water',
        type: 'water',
        color: 'transparent',
        quantity: '1',
        price: '5€',
        stock: '100',
        provider: 'Spa'
    },
    {
        id: 10,
        name: 'Wine',
        type: 'alcohol',
        color: 'red',
        quantity: '12',
        price: '50€',
        stock: '50',
        provider: 'Chateau neuf du pape'
    },
    {
        id: 11,
        name: 'Wine',
        type: 'alcohol',
        color: 'red',
        quantity: '2',
        price: '5€',
        stock: '50',
        provider: 'Bourgogne'
    }
];

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
    props: {
        columns,
        items,
        onAdd: action('onAdd'),
        onSelect: action('onSelect'),
        onSort: action('onSort'),
        onFilter: action('onFilter')
    }
});
