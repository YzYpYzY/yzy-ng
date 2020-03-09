import { Column } from '../models';
import { FieldModel } from './../../field/models';
import { FieldTypes } from './../../field/enums';
import { FormGroup } from '@angular/forms';
import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation,
    HostBinding,
    HostListener
} from '@angular/core';
import { ColumnTypes } from '..';

@Component({
    selector: 'yzy-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
    @Input() column: Column;
    @Input() value: string | number;
    @HostBinding('class.editable') displayedAsEditable = false;
    @HostBinding('class.in-edition') inEdition = false;
    form: FormGroup;
    fieldModel: FieldModel;
    displayValue: string | number;

    ColumnTypes = ColumnTypes;
    constructor() {}

    @HostListener('click') onClick() {
        console.log(this.value);

        if (this.column.editable) {
            this.inEdition = true;
            if (this.column.type === ColumnTypes.Dropdown) {
                this.form = new FormGroup({});
                this.fieldModel = {
                    name: this.column.name,
                    label: null,
                    type: FieldTypes.Dropdown,
                    value: this.value,
                    options: this.column.options
                };
            }
        }
    }
    ngOnInit(): void {
        if (this.column.type === ColumnTypes.Dropdown) {
            const index = this.column.options.findIndex(
                o => o.value === this.value
            );
            this.displayValue =
                index !== -1 ? this.column.options[index].label : '';
        } else {
            this.displayValue = this.value;
        }
        this.displayedAsEditable = this.column.editable;
    }
}
