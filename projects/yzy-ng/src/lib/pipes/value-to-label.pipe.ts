import { OptionModel } from './../dropdown/models/OptionModel';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'valueToLabel'
})
export class ValueToLabelPipe implements PipeTransform {
    transform(value: string | number, ...args: any[]): string {
        const options: OptionModel[] = args[0];
        if(value === undefined){ return '';}
        const option = options.find(o => o.value === value);
        return  option ? option.label : value!= null ? value.toString(): '';
    }
}
