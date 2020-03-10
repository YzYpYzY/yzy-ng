import { FieldComponent, FieldTypes, FieldModule, CheckboxComponent } from 'yzy-ng';
import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    FormsModule
} from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { FieldErrorModule } from 'projects/yzy-ng/src/public-api';
import { action } from '@storybook/addon-actions';
const fb = new FormBuilder();

export default {
    title: 'Field',
    decorators: [
        moduleMetadata({
            imports: [
                ReactiveFormsModule,
                FieldModule,
                FieldErrorModule,
                FormsModule
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
