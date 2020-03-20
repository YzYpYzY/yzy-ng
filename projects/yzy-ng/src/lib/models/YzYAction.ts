import { YzYActionTypes } from '.';

export interface YzYAction {
    name: string;
    type?: YzYActionTypes;
    class?: string;
    disabled?: boolean;
}
