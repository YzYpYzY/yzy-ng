import { moduleMetadata } from '@storybook/angular';
import {
    LayoutModule,
    YzYAction,
    YzYActionTypes,
    FieldTypes,
    BarComponent
} from 'yzy-ng';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Layout',
    decorators: [
        moduleMetadata({
            imports: [LayoutModule]
        })
    ]
};
const actions: YzYAction[] = [
    { name: 'save', class: 'gg-check', type: YzYActionTypes.Warning },
    { name: 'add', class: 'gg-math-plus', type: YzYActionTypes.Success },
    { name: 'back', class: 'gg-chevron-left', type: YzYActionTypes.Info },
    { name: 'alert', class: 'gg-bell', type: YzYActionTypes.Error },
    {
        name: 'attachment',
        class: 'gg-attachment',
        type: YzYActionTypes.Default
    },
    {
        name: 'saveDisabled',
        class: 'gg-check',
        type: YzYActionTypes.Warning,
        disabled: true
    }
];
export const headerBar = () => ({
    component: BarComponent,
    template: `
    <div class="demo-desktop">
    <yzy-bar [title]="title"></yzy-bar>
    </div>
    `,
    props: {
        title: 'Liste des membres'
    }
});
export const headerBarWithActions = () => ({
    component: BarComponent,
    template: `
    <div class="demo-desktop">
    <yzy-bar [title]="title" [actions]="actions" (action)="action($event)"></yzy-bar>
    </div>
    `,
    props: {
        title: 'Liste des membres',
        actions,
        action: action('action')
    }
});

const typeOptions = [
    { label: 'Soda', value: 'soda' },
    { label: 'Water', value: 'water' },
    { label: 'Alcohol', value: 'alcohol' }
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
export const filterBar = () => ({
    component: BarComponent,
    template: `
    <div class="demo-desktop">
    <yzy-bar [title]="title" [formModel]="formModel"></yzy-bar>
    </div>
    `,
    props: {
        title: 'Liste des membres',
        formModel
    }
});

const stretchForm = {
    title: null,
    isPlaceHolder: true,
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
        },
        {
            type: FieldTypes.Date,
            name: 'date',
            label: 'Date',
            validators: []
        },
        {
            type: FieldTypes.File,
            name: 'file',
            label: 'File',
            validators: []
        },
        {
            type: FieldTypes.Radio,
            name: 'radio',
            label: 'Radio',
            options: [
                { label: 'Option1', value: '1' },
                { label: 'Option2', value: '2' },
                { label: 'Option3', value: '3' }
            ],
            validators: []
        }
    ]
};

export const filterBarStretched = () => ({
    component: BarComponent,
    template: `
    <div class="demo-desktop">
    <yzy-bar class="stretch" [title]="title" [formModel]="formModel"></yzy-bar>
    </div>
    `,
    props: {
        title: 'Liste des membres',
        formModel: stretchForm
    }
});
