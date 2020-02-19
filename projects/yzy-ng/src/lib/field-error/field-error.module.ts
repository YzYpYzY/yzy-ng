import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorComponent } from './field-error.component';

@NgModule({
    declarations: [FieldErrorComponent],
    imports: [CommonModule, FormsModule],
    exports: [FieldErrorComponent],
    providers: []
})
export class FieldErrorModule {}
