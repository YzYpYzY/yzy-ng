import {
    Component,
    OnInit,
    Input,
    HostBinding,
    Inject,
    PipeTransform,
    Optional,
    InjectionToken
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FieldTypes } from './enums/FieldTypes';
import { FieldModel } from './models/FieldModel';
import { debounce, takeUntil } from 'rxjs/operators';
import { timer } from 'rxjs';
import { YzYFormGroup } from '../form/YzYFormGroup';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'yzy-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss']
})
export class FieldComponent extends BaseComponent implements OnInit {
    FieldTypes = FieldTypes;
    @Input() fieldModel: FieldModel;
    @Input() form: YzYFormGroup;
    @Input() debounceTime = 2000;

    @HostBinding('class.hasError') hasError = false;
    @HostBinding('class.is-valid') isValid = false;
    @HostBinding('class.is-readonly') isReadOnly = false;

    @HostBinding('style.grid-column-start') columnStart: number | string =
        'auto';
    @HostBinding('style.grid-column-end') columnEnd: number | string = 'auto';
    @HostBinding('style.grid-row-start') rowStart: number | string = 'auto';
    @HostBinding('style.grid-row-end') rowEnd: number | string = 'auto';

    control: AbstractControl;
    htmltype: 'text' | 'password' | 'email' | 'number' = 'text';
    errors: string[] = [];

    constructor(
        @Optional()
        @Inject('YzYTranslateService')
        private translateService?: any
    ) {
        super();
    }

    ngOnInit() {
        this.control = this.form.get(this.fieldModel.name);
        this.control.setValidators(this.fieldModel.validators);
        this.isReadOnly = !this.control.enabled;
        if (this.fieldModel && this.fieldModel.column !== undefined) {
            const parts = this.fieldModel.column.toString().split('/');
            this.columnStart = parts[0];
            if (parts[1] !== undefined) {
                this.columnEnd = parts[1];
            }
        }
        if (this.fieldModel && this.fieldModel.row !== undefined) {
            const parts = this.fieldModel.row.toString().split('/');
            this.rowStart = parts[0];
            if (parts[1] !== undefined) {
                this.rowEnd = parts[1];
            }
        }
        this.control.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                debounce(() => timer(this.debounceTime))
            )
            .subscribe(change => {
                this.treatErrors();
                this.isValid = this.control.valid;
            });
        this.form.displayError$
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                if (value) {
                    this.treatErrors();
                    this.isValid = this.control.valid;
                }
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
    treatErrors() {
        if (this.control.errors) {
            const errors = Object.keys(this.control.errors)
                .filter(k => this.control.errors[k])
                .map(e => 'field.error.' + e);
            if (this.translateService) {
                this.errors = errors.map(e => this.translateService.instant(e));
            } else {
                this.errors = errors;
            }
            this.hasError = true;
        } else {
            this.errors = [];
            this.hasError = false;
        }
    }
}
