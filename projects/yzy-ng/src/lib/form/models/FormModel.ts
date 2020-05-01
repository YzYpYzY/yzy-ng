import { FieldModel } from '../../field/models/FieldModel';

export interface FormModel {
    title?: string;
    fields: FieldModel[];
    isInline?: boolean;
    isPlaceHolder?: boolean;
}
