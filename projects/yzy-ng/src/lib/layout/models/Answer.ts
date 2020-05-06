import { AnswerType } from './AnswerType';

export interface Answer {
    label: string;
    value: string | number | boolean;
    type: AnswerType;
}
