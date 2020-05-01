import { FileSelectorModule } from './../file-selector/file-selector.module';
import { RadioModule } from './../radio/radio.module';
import { CheckboxModule } from './../checkbox/checkbox.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { FieldErrorComponent } from './field-error/field-error.component';
import { DateSelectorModule } from '../date-selector/date-selector.module';

@NgModule({
    declarations: [FieldComponent, FieldErrorComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        DateSelectorModule,
        CheckboxModule,
        RadioModule,
        FileSelectorModule
    ],
    exports: [FieldComponent, FieldErrorComponent]
})
export class FieldModule {}
