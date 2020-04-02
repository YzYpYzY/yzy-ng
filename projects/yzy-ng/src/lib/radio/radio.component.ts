import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OptionModel } from '../dropdown/models/OptionModel';
import { FormGroup, FormControl } from '@angular/forms';
import { FieldModel } from '../field/models/FieldModel';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'yzy-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends BaseComponent implements OnInit {
    @Input() fieldModel: FieldModel;
    @Input() form: FormGroup;

    @Input() label: string;
    @Input() selectedValue: string | number;
    @Input() options: OptionModel[];
    @Input() isReadOnly: boolean;

    @Output() valueChange = new EventEmitter<any>();

    control: FormControl;
    displayLabel: string;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.selectedValue =
            this.selectedValue !== undefined
                ? this.selectedValue
                : this.fieldModel.value !== undefined
                ? this.fieldModel.value
                : 0;
        this.options =
            this.options !== undefined
                ? this.options
                : this.fieldModel.options !== undefined
                ? this.fieldModel.options
                : [];
        this.displayLabel = this.label
            ? this.label
            : this.fieldModel && this.fieldModel.label
            ? this.fieldModel.label
            : null;
        const controlName =
            this.fieldModel && this.fieldModel.name
                ? this.fieldModel.name
                : 'default';
        if (this.form === undefined) {
            this.form = new FormGroup({});
            this.form.addControl(controlName, new FormControl());
        }
        this.control = this.form.controls[controlName] as FormControl;

        if (this.isReadOnly) {
            this.control.disable();
        }
        this.control.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this.selectedValue = value;
                this.valueChange.emit(value);
            });
    }

    selectOption(option: OptionModel): void {
        this.control.setValue(option.value);
    }
}
