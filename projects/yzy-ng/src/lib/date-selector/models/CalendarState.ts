import { OptionModel } from './../../dropdown/models/OptionModel';
import { DisplayDate } from './DisplayDate';

export interface CalendarState {
    id: number;
    value: DisplayDate | OptionModel;
    isOpen: boolean;
    isValidate?: boolean;
}
