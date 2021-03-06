import { FormModel } from './models/FormModel';
import {
    FormGroup,
    AbstractControl,
    ValidatorFn,
    AbstractControlOptions,
    AsyncValidatorFn
} from '@angular/forms';
import { FieldTypes } from '../field/enums/FieldTypes';
import { Subject, BehaviorSubject } from 'rxjs';
export class YzYFormGroup extends FormGroup {
    model: FormModel;
    displayError$ = new BehaviorSubject<boolean>(false);
    constructor(
        controls: {
            [key: string]: AbstractControl;
        },
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    ) {
        super(controls, validatorOrOpts, asyncValidator);        
    }
    getTypedValue(model: FormModel = this.model): any {
        const res: any = {};
        const rawValue = this.getRawValue();
        for (const field of model.fields) {
            rawValue[field.name] =
                rawValue[field.name] === '' ? null : rawValue[field.name];
            switch (field.type) {
                case FieldTypes.Number:
                    res[field.name] =
                        rawValue[field.name] != null
                            ? parseInt(rawValue[field.name], 10)
                            : null;
                    break;
                default:
                    res[field.name] = rawValue[field.name];
                    break;
            }
        }
        return res;
    }
    testValidityAndDisplayErrors() {
        this.displayError$.next(true);
        return this.valid;
    }
}
