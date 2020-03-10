import { FieldTypes, FieldModule, FormComponent } from 'yzy-ng';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormsModule,
    Validators
} from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Form',
    decorators: [
        moduleMetadata({
            imports: [ReactiveFormsModule, FieldModule, FormsModule]
        })
    ]
};

export const login = () => ({
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
                    label: 'Mot de passe',
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
