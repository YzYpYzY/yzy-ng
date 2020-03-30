import { ColumnTypes } from './ColumnTypes';
import { OptionModel } from '../../dropdown/models/OptionModel';

export interface Column {
    name: string;
    attribute: string;
    isSortable?: boolean;
    hide?: boolean;
    width?: number | string;
    type?: ColumnTypes;
    editable?: boolean;
    options?: OptionModel[];
    customStyles?: (value) => { [key:string] : string };
}
