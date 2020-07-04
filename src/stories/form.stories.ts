import { text } from './field.stories';
import { FieldTypes, FieldModule, FormComponent, DropdownModule } from 'yzy-ng';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Form',
    decorators: [
        moduleMetadata({
            imports: [
                DropdownModule,
                ReactiveFormsModule,
                FieldModule,
                FormsModule
            ]
        })
    ]
};

export const base = () => ({
    component: FormComponent,
    props: {
        formModel: {
            title: 'Connexion',
            fields: [
                {
                    type: FieldTypes.Email,
                    name: 'email',
                    label: 'E-mail',
                    validators: [Validators.required, Validators.email]
                },
                {
                    type: FieldTypes.Password,
                    name: 'password',
                    label: 'Password',
                    validators: [Validators.required]
                },
                {
                    type: FieldTypes.Checkbox,
                    name: 'rememberme',
                    label: 'Remember me',
                    validators: []
                }
            ]
        },
        formReady: action('formReady')
    }
});

export const placeholder = () => ({
    component: FormComponent,
    props: {
        formModel: {
            title: 'Connexion',
            isPlaceHolder: true,
            fields: [
                {
                    type: FieldTypes.Email,
                    name: 'email',
                    label: 'E-mail',
                    validators: [Validators.required, Validators.email]
                },
                {
                    type: FieldTypes.Password,
                    name: 'password',
                    label: 'Password',
                    validators: [Validators.required]
                },
                {
                    type: FieldTypes.Checkbox,
                    name: 'rememberme',
                    label: 'Remember me',
                    validators: []
                }
            ]
        },
        formReady: action('formReady')
    }
});
export const inline = () => ({
    component: FormComponent,
    props: {
        formModel: {
            title: null,
            isInline: true,
            isPlaceHolder: false,
            fields: [
                {
                    type: FieldTypes.Email,
                    name: 'email',
                    label: 'E-mail',
                    validators: [Validators.required, Validators.email]
                },
                {
                    type: FieldTypes.Text,
                    name: 'name',
                    label: 'Nom',
                    validators: [Validators.required]
                },
                {
                    type: FieldTypes.Checkbox,
                    name: 'active',
                    label: 'Active',
                    validators: []
                }
            ]
        },
        formReady: action('formReady')
    }
});

export const inlineAndPlaceholder = () => ({
    component: FormComponent,
    props: {
        formModel: {
            title: null,
            isInline: true,
            isPlaceHolder: true,
            fields: [
                {
                    type: FieldTypes.Email,
                    name: 'email',
                    label: 'E-mail',
                    validators: [Validators.required, Validators.email]
                },
                {
                    type: FieldTypes.Text,
                    name: 'name',
                    label: 'Nom',
                    validators: [Validators.required]
                },
                {
                    type: FieldTypes.Checkbox,
                    name: 'active',
                    label: 'Active',
                    validators: []
                }
            ]
        },
        formReady: action('formReady')
    }
});

const allFields = [
    {
        type: FieldTypes.Text,
        name: 'text',
        label: 'Text',
        validators: []
    },
    {
        type: FieldTypes.TextArea,
        name: 'textArea',
        label: 'Text Area',
        validators: []
    },
    {
        type: FieldTypes.Checkbox,
        name: 'checkbox',
        label: 'Checkbox',
        validators: []
    },
    {
        type: FieldTypes.Dropdown,
        name: 'dropdown',
        label: 'Dropdown',
        options: [
            { label: 'Option1', value: '1' },
            { label: 'Option2', value: '2' },
            { label: 'Option3', value: '3' }
        ],
        validators: []
    },
    {
        type: FieldTypes.Date,
        name: 'date',
        label: 'Date',
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
    },
    {
        type: FieldTypes.Number,
        name: 'number',
        label: 'Number',
        validators: []
    },
    {
        type: FieldTypes.Email,
        name: 'email',
        label: 'E-mail',
        validators: []
    },
    {
        type: FieldTypes.Password,
        name: 'password',
        label: 'Password',
        validators: []
    },
    {
        type: FieldTypes.File,
        name: 'file',
        label: 'File',
        validators: []
    },
    {
        type: FieldTypes.Text,
        name: 'required',
        label: 'Required',
        validators: [Validators.required]
    }
];

export const allFieldTypes = () => ({
    component: FormComponent,
    props: {
        formModel: {
            title: null,
            isInline: false,
            isPlaceHolder: false,
            fields: allFields
        },
        formReady: action('formReady')
    }
});
export const allFieldTypesPlaceholder = () => ({
    component: FormComponent,
    props: {
        formModel: {
            title: null,
            isInline: false,
            isPlaceHolder: true,
            fields: allFields
        },
        formReady: action('formReady')
    }
});
export const allFieldTypesPlaceholderAndInline = () => ({
    component: FormComponent,
    props: {
        formModel: {
            title: null,
            isInline: true,
            isPlaceHolder: true,
            fields: allFields
        },
        formReady: action('formReady')
    }
});

const fieldsMultiColumns = [
    {
        type: FieldTypes.Text,
        name: 'text',
        label: 'Text',
        validators: [],
        column: 1,
        row: 1
    },
    {
        type: FieldTypes.TextArea,
        name: 'textArea',
        label: 'Text Area',
        validators: [],
        column: 2,
        row: '1 / 3'
    },
    {
        type: FieldTypes.Checkbox,
        name: 'checkbox',
        label: 'Checkbox',
        validators: [],
        column: 1,
        row: 2
    },
    {
        type: FieldTypes.Dropdown,
        name: 'dropdown',
        label: 'Dropdown',
        options: [
            { label: 'Option1', value: '1' },
            { label: 'Option2', value: '2' },
            { label: 'Option3', value: '3' }
        ],
        validators: []
    },
    {
        type: FieldTypes.Date,
        name: 'date',
        label: 'Date',
        validators: [],
        column: 2
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
    },
    {
        type: FieldTypes.Number,
        name: 'number',
        label: 'Number',
        validators: []
    },
    {
        type: FieldTypes.Email,
        name: 'email',
        label: 'E-mail',
        validators: [],
        column: 3
    },
    {
        type: FieldTypes.File,
        name: 'file',
        label: 'File',
        validators: [],
        column: 3
    },
    {
        type: FieldTypes.Text,
        name: 'required',
        label: 'Required',
        validators: [Validators.required]
    }
];

export const multiColumn = () => ({
    component: FormComponent,
    props: {
        formModel: {
            title: null,
            isInline: false,
            isPlaceHolder: false,
            fields: fieldsMultiColumns
        },
        formReady: action('formReady')
    }
});
