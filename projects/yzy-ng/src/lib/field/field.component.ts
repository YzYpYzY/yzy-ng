import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FieldTypes } from './enums/FieldTypes';
import { FieldModel } from './models/FieldModel';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
    selector: 'yzy-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
    FieldTypes = FieldTypes;
    @Input() fieldModel: FieldModel;
    @Input() form: FormGroup;
    @Input() debounceTime = 2000;

    @HostBinding('class.hasError') hasError = false;
    @HostBinding('class.is-valid') isValid = false;
    @HostBinding('class.is-readonly') isReadOnly = false;

    control: AbstractControl;
    htmltype: 'text' | 'password' | 'email' | 'number' = 'text';
    errors: string[] = [];

    constructor() {}

    ngOnInit() {
        this.control = this.form.get(this.fieldModel.name);
        this.control.setValidators(this.fieldModel.validators);
        this.isReadOnly = !this.control.enabled;
        this.control.valueChanges
            .pipe(debounce(() => timer(this.debounceTime)))
            .subscribe(change => {
                if (this.control.errors) {
                    this.errors = Object.keys(this.control.errors)
                        .filter(k => this.control.errors[k])
                        .map(e => 'field.error.' + e);
                    this.hasError = true;
                } else {
                    this.errors = [];
                    this.hasError = false;
                }
                this.isValid = this.control.valid;
            });
        switch (this.fieldModel.type) {
            case FieldTypes.Text:
                this.htmltype = 'text';
                break;
            case FieldTypes.Number:
                this.htmltype = 'number';
                break;
            case FieldTypes.Email:
                this.htmltype = 'email';
                break;
            case FieldTypes.Password:
                this.htmltype = 'password';
                break;
        }
    }
}
