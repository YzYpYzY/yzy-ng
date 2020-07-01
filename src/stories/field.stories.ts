import { YzYFormGroup } from './../../projects/yzy-ng/src/lib/form/YzYFormGroup';
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
    FormsModule,
    AbstractControl,
    FormControl
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
const fb = new FormBuilder();
import { CommonModule } from '@angular/common';
import { MokeTranslateService } from '../moks/moke.translate.service';
import { tap } from 'rxjs/operators';

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
const baseForm = new YzYFormGroup({
    demo: new FormControl('Doe')
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
        form: new YzYFormGroup({
            demo: new FormControl('Awesome comment !')
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
        form: new YzYFormGroup({
            demo: new FormControl(false)
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
        form: new YzYFormGroup({
            demo: new FormControl(false)
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
            options: [{ label: 'Pas de retour', value: 'Pas de retour' }],
            dateOptions: {
                displayFormat: 'eu',
                format: 'eu'
            }
        },
        form: new YzYFormGroup({
            demo: new FormControl(false)
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
        form: new YzYFormGroup({
            demo: new FormControl(false)
        })
    }
});
export const number = () => ({
    component: FieldComponent,
    props: {
        fieldModel: { name: 'demo', label: 'Count', type: FieldTypes.Number },
        form: new YzYFormGroup({
            demo: new FormControl(42)
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
        form: new YzYFormGroup({
            demo: new FormControl('john@doe.com')
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
        form: new YzYFormGroup({
            demo: new FormControl('password')
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
        form: new YzYFormGroup({
            file: new FormControl(null)
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
        form: new YzYFormGroup({
            demo: new FormControl('')
        })
    }
});
