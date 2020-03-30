import { ElementsValueChanges } from './ElementsValueChanges';
import { ElementValueChange } from './ElementValueChange';

export interface TableValueChangeEvent {
    totalChanges: ElementsValueChanges;
    lastChange: ElementValueChange;
}
