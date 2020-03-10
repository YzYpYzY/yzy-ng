import { Component, OnInit, Input, HostListener } from '@angular/core';
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
    @HostListener('click') toggleValue(): void {
        this.isChecked = !this.isChecked;
        this.control.setValue(this.isChecked);
    }
    isChecked = false;
    control: FormControl;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.control = this.form.controls[this.fieldModel.name] as FormControl;
        if (this.control) {
            this.control.valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe((value: boolean) => (this.isChecked = value));
        }
    }

}
