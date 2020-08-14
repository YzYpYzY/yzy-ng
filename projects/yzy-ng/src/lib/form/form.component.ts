import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    HostBinding,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { FormModel } from './models/FormModel';
import { FormControl, ValidatorFn } from '@angular/forms';
import { YzYFormGroup } from './YzYFormGroup';

@Component({
    selector: 'yzy-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
    @Input() formModel: FormModel;
    @Output() formReady = new EventEmitter<YzYFormGroup>();

    @HostBinding('class.inline') isInline = false;

    form: YzYFormGroup;

    constructor() {}

    ngOnInit() {
        this.isInline = this.formModel.isInline ? true : false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.form = new YzYFormGroup({});
        this.form.model = this.formModel;
        this.formModel.fields.forEach(f => {
            const control = new FormControl(
                '',
                f.validators !== undefined ? f.validators as ValidatorFn[] : []
            );
            if (f.isReadOnly) {
                control.disable();
            }
            if (f.value !== undefined) {
                control.setValue(f.value);
            }
            this.form.addControl(f.name, control);
        });
        if (this.formModel.isPlaceHolder) {
            this.formModel.fields = this.formModel.fields.map(f => ({
                ...f,
                isPlaceHolder: true
            }));
        }
        this.formReady.emit(this.form);
    }
}
