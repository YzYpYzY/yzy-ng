import { YzYActionTypes } from './YzYActionTypes';

export interface YzYAction {
    name: string;
    type?: YzYActionTypes;
    class?: string;
    disabled?: boolean;
}
