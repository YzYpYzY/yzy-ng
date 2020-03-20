import { OptionModel } from './OptionModel';
export interface DropdownOptionState {
    id: number;
    selectedOption: OptionModel;
    isOpen: boolean;
}
