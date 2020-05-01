import { FieldModel } from './../field/models/FieldModel';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'yzy-file-selector',
    templateUrl: './file-selector.component.html',
    styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent extends BaseComponent implements OnInit {
    @Input() fieldModel: FieldModel;
    @Input() form: FormGroup;
    @Input() label: string;
    @Input() name: string;
    @Input() accept: string;
    @Input() path: string;
    @Input() isReadOnly: boolean;
    @Output() valueChange = new EventEmitter<File>();

    control: FormControl;
    displayLabel: string;
    displayValue: string;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.displayLabel = this.label
            ? this.label
            : this.fieldModel && this.fieldModel.label
            ? this.fieldModel.label
            : null;
        this.name = this.name
            ? this.name
            : this.fieldModel && this.fieldModel.name
            ? this.fieldModel.name
            : 'default';
        this.accept = this.accept
            ? this.accept
            : this.fieldModel && this.fieldModel.accept
            ? this.fieldModel.accept
            : '*';
        this.displayValue = this.path
            ? this.path
            : this.fieldModel && this.fieldModel.value
            ? this.fieldModel.value.toString()
            : this.fieldModel.isPlaceHolder
            ? this.fieldModel.label
            : null;
        if (this.form === undefined) {
            this.form = new FormGroup({});
            this.form.addControl(this.name, new FormControl(null));
        }
        this.control = this.form.controls[this.name] as FormControl;

        if (this.isReadOnly) {
            this.control.disable();
        }
        if (this.control) {
            this.control.valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe((file: File) => {
                    this.displayValue = file
                        ? file.name
                        : this.fieldModel.isPlaceHolder
                        ? this.fieldModel.label
                        : null;
                    this.valueChange.emit(file);
                });
        }
    }

    newValue(event): void {
        this.control.setValue(event.target.files[0]);
    }
}
