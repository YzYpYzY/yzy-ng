import { ValidatorFn } from '@angular/forms';
import { FieldTypes } from '../enums/FieldTypes';
import { OptionModel } from '../../dropdown/models/OptionModel';

export interface FieldModel {
    name: string;
    label: string;
    type: FieldTypes;
    value?: string | number;
    options?: OptionModel[];
    isReadOnly?: boolean;
    validators?: ValidatorFn[];
}
