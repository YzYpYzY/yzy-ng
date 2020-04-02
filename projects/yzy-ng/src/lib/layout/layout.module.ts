import { PipeModule } from './../pipes/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar/bar.component';
import { YzYFormsModule } from '../form/form.module';

@NgModule({
    declarations: [BarComponent],
    imports: [CommonModule, PipeModule, YzYFormsModule],
    exports: [BarComponent]
})
export class LayoutModule {}
