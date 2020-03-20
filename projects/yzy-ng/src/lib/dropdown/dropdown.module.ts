import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownOptionsComponent } from './dropdown-options/dropdown-options.component';

@NgModule({
    declarations: [DropdownComponent, DropdownOptionsComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [DropdownComponent, DropdownOptionsComponent],
    entryComponents: [DropdownOptionsComponent]
})
export class DropdownModule {}
