import { RadioModule } from './../radio/radio.module';
import { CheckboxModule } from './../checkbox/checkbox.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { FieldErrorComponent } from './field-error/field-error.component';

@NgModule({
    declarations: [FieldComponent, FieldErrorComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        CheckboxModule,
        RadioModule
    ],
    exports: [FieldComponent, FieldErrorComponent]
})
export class FieldModule {}
