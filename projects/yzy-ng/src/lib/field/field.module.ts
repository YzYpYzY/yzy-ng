import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';
import { FieldErrorModule } from '../field-error/field-error.module';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
    declarations: [FieldComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FieldErrorModule,
        DropdownModule
    ],
    exports: [FieldComponent]
})
export class FieldModule {}
