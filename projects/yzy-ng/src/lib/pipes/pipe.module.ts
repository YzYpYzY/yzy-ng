import { ValueToLabelPipe } from './value-to-label.pipe';
import { ActionTypeToClassPipe } from './action-type-to-class.pipe';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [],
    declarations: [ActionTypeToClassPipe, ValueToLabelPipe],
    providers: [ActionTypeToClassPipe, ValueToLabelPipe],
    exports: [ActionTypeToClassPipe, ValueToLabelPipe]
})
export class PipeModule { }
