import { Component, OnInit, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { FieldModel } from '../field';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'yzy-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseComponent implements OnInit {
    @Input() fieldModel: FieldModel;
    @Input() form: FormGroup;
    @Input() label: string;
    @Input() value: boolean;
    @Input() isReadOnly: boolean;
    @Output() valueChange = new EventEmitter<boolean>();
    isChecked = false;
    control: FormControl;
    displayLabel: string;
    @HostListener('click') toggleValue(): void {
        if(this.control.enabled){
            this.isChecked = !this.isChecked;
            this.control.setValue(this.isChecked);
        }
    }

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.displayLabel = this.label ? this.label : this.fieldModel && this.fieldModel.label ? this.fieldModel.label : null;
        const controlName = this.fieldModel && this.fieldModel.name ? this.fieldModel.name : 'default';
        if(this.form === undefined){
            this.form = new FormGroup({});
            this.form.addControl(controlName, new FormControl(this.value));
        }
        this.control = this.form.controls[controlName] as FormControl;
        this.isChecked = this.control.value;
        if(this.isReadOnly){
            this.control.disable();
        }
        if (this.control) {
            this.control.valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe((value: boolean) => {
                    this.isChecked = value;
                    this.valueChange.emit(value);
                });
        }
    }

}
