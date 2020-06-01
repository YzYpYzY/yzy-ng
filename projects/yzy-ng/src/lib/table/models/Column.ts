import { ColumnTypes } from './ColumnTypes';
import { OptionModel } from '../../dropdown/models/OptionModel';
import { DateOptions } from '../../date-selector/models/DateOptions';

export interface Column {
    name: string;
    attribute: string;
    isSortable?: boolean;
    hide?: boolean;
    width?: number | string;
    type?: ColumnTypes;
    editable?: boolean;
    options?: OptionModel[];
    dateOptions?: DateOptions;
    customStyles?: (value) => { [key: string]: string };
}
