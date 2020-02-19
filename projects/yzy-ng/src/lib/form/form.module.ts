import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FieldModule } from '../field/field.module';

@NgModule({
    declarations: [FormComponent],
    imports: [CommonModule, FieldModule],
    exports: [FormComponent]
})
export class YzYFormsModule {}
