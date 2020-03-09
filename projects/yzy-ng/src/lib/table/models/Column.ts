import { ColumnTypes } from '.';
import { OptionModel } from '../../dropdown';

export interface Column {
    name: string;
    attribute: string;
    hide?: boolean;
    width?: number | string;
    type?: ColumnTypes;
    editable?: boolean;
    options?: OptionModel[];
}
