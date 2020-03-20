import { YzYActionTypes } from './../models/YzYActionTypes';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'actionTypeToClass'
})
export class ActionTypeToClassPipe implements PipeTransform {
    transform(value: YzYActionTypes, ...args: any[]): string {
        switch(value) {
            case YzYActionTypes.Default:
                return 'action action-default';
            case YzYActionTypes.Success:
                return 'action action-success';
            case YzYActionTypes.Warning:
                return 'action action-warning';
            case YzYActionTypes.Info:
                return 'action action-info';
            case YzYActionTypes.Error:
                return 'action action-error';
        }
        return '';
    }
}
