import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FieldTypes } from '../enums/FieldTypes';
import { OptionModel } from '../../dropdown/models/OptionModel';
import { DateOptions } from '../../date-selector/models/DateOptions';

export interface FieldModel {
    name: string;
    label: string;
    type: FieldTypes;
    value?: string | number;
    options?: OptionModel[];
    isReadOnly?: boolean;
    validators?: ((control: AbstractControl) => ValidationErrors)[] | null;
    isPlaceHolder?: boolean;
    accept?: string;
    isHide?: boolean;
    dateOptions?: DateOptions;
}
