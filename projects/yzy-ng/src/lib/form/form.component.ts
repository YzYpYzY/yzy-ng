import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    HostBinding
} from '@angular/core';
import { FormModel } from './models/FormModel';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'yzy-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    @Input() formModel: FormModel;
    @Output() formReady = new EventEmitter<FormGroup>();

    @HostBinding('class.inline') isInline = false;

    form: FormGroup;

    constructor() {}

    ngOnInit() {
        this.isInline = this.formModel.isInline ? true : false;
        this.form = new FormGroup({});
        this.formModel.fields.forEach(f => {
            const control = new FormControl(
                '',
                f.validators !== undefined ? f.validators : []
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
