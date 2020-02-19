import { FormBuilder } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { DropdownModule, FieldTypes, DropdownComponent } from 'yzy-ng';
const fb = new FormBuilder();
const options = [
    { value: 0, label: 'Coca' },
    { value: 1, label: 'Water' },
    { value: 2, label: 'Wine' }
];

export default {
    title: 'Dropdown',
    decorators: [
        moduleMetadata({
            imports: [DropdownModule]
        })
    ]
};
export const simple = () => ({
    component: DropdownComponent,
    props: {
        fieldModel: {
            label: 'Drink',
            name: 'drink',
            type: FieldTypes.Dropdown,
            options
        },
        form: fb.group({
            drink: null
        })
    }
});
