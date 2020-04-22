import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectorComponent } from './file-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [FileSelectorComponent],
    imports: [CommonModule, FormsModule],
    exports: [FileSelectorComponent]
})
export class FileSelectorModule {}
