import {
    FieldComponent,
    FieldTypes,
    FieldModule,
    CheckboxComponent,
    RadioComponent,
    DropdownComponent,
    DateSelectorComponent,
    FileSelectorComponent
} from 'yzy-ng';
import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    FormsModule
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
const fb = new FormBuilder();
import { CommonModule } from '@angular/common';
import { MokeTranslateService } from '../moks/moke.translate.service';

export default {
    title: 'Field',
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                HttpClientModule,
                ReactiveFormsModule,
                FieldModule,
                FormsModule
            ],
            providers: [
                {
                    provide: 'YzYTranslateService',
                    useClass: MokeTranslateService
                }
            ]
        })
    ]
};
const baseForm = fb.group({
    demo: 'Doe'
});
baseForm.statusChanges.subscribe(value => action('statusChanges'));
export const text = () => ({
    component: FieldComponent,
    props: {
        fieldModel: { name: 'demo', label: 'Name', type: FieldTypes.Text },
        form: baseForm
    }
});
export const textArea = () => ({
    component: FieldComponent,
    props: {
        fieldModel: {
            name: 'demo',
            label: 'Comment',
            type: FieldTypes.TextArea
        },
        form: fb.group({
            demo: 'Awesome comment !'
        })
    }
});
export const checkbox = () => ({
    component: CheckboxComponent,
    props: {
        fieldModel: {
            name: 'demo',
            label: 'Stay connected',
            type: FieldTypes.Checkbox
        },
        form: fb.group({
            demo: false
        })
    }
});
const options = [
    { value: 0, label: 'Coca' },
    { value: 1, label: 'Water' },
    { value: 2, label: 'Wine' }
];
export const dropdown = () => ({
    component: DropdownComponent,
    props: {
        fieldModel: {
            name: 'demo',
            label: 'Drink',
            type: FieldTypes.Dropdown,
            options
        },
        form: fb.group({
            demo: false
        })
    }
});
export const date = () => ({
    component: DateSelectorComponent,
    props: {
        fieldModel: {
            name: 'demo',
            label: 'Retour',
            type: FieldTypes.Date,
            options: [{ label: 'Pas de retour', value: null }]
        },
        form: fb.group({
            demo: false
        })
    }
});
export const radio = () => ({
    component: RadioComponent,
    props: {
        fieldModel: {
            name: 'demo',
            label: 'Drink',
            type: FieldTypes.Radio,
            options
        },
        form: fb.group({
            demo: false
        })
    }
});
export const number = () => ({
    component: FieldComponent,
    props: {
        fieldModel: { name: 'demo', label: 'Count', type: FieldTypes.Number },
        form: fb.group({
            demo: '42'
        })
    }
});
export const email = () => ({
    component: FieldComponent,
    props: {
        fieldModel: {
            name: 'demo',
            label: 'Email',
            type: FieldTypes.Email,
            validators: [Validators.email]
        },
        form: fb.group({
            demo: 'john@doe.com'
        })
    }
});
export const password = () => ({
    component: FieldComponent,
    props: {
        fieldModel: {
            name: 'demo',
            label: 'Password',
            type: FieldTypes.Password
        },
        form: fb.group({
            demo: 'password'
        })
    }
});
export const file = () => ({
    component: FileSelectorComponent,
    props: {
        fieldModel: {
            name: 'file',
            label: 'File',
            type: FieldTypes.File
        },
        form: fb.group({
            file: 'null'
        })
    }
});
export const required = () => ({
    component: FieldComponent,
    props: {
        fieldModel: {
            name: 'demo',
            label: 'Name',
            type: FieldTypes.Text,
            validators: [Validators.required]
        },
        form: fb.group({
            demo: ''
        })
    }
});
