import { moduleMetadata } from '@storybook/angular';
import { TableModule, TableComponent, Column } from 'yzy-ng';
import { action } from '@storybook/addon-actions';
import '!style-loader!css-loader!../../dist/yzy-ng-themes/base-theme.css';
const columns: Column[] = [
    { name: 'Name', attribute: 'name' },
    { name: 'Type', attribute: 'type' },
    { name: 'Color', attribute: 'color' }
];
const items = [
    { id: 0, name: 'Coca', type: 'soda', color: 'black' },
    { id: 1, name: 'Water', type: 'water', color: 'transparent' },
    { id: 2, name: 'Wine', type: 'Alcohol', color: 'red' }
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
