import { FormModel } from './models/FormModel';
import { FormGroup, AbstractControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';
import { FieldTypes } from '../field/enums/FieldTypes';
export class YzYFormGroup extends FormGroup {
    model: FormModel;
    constructor(controls: {
        [key: string]: AbstractControl;
    }, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]) {
        super(controls, validatorOrOpts, asyncValidator);
    }
    getTypedValue(model: FormModel = this.model): any {
        const res: any = {};
        const rawValue = this.getRawValue();
        for (const field of model.fields) {
            switch (field.type) {
                case FieldTypes.Number:
                    res[field.name] = rawValue[field.name] != null ? parseInt(rawValue[field.name], 10) : null;
                    break;
                default:
                    res[field.name] = rawValue[field.name];
                    break;
            }
        }
        return res;
    }
}
