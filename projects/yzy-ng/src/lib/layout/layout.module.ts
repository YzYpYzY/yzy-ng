import { PipeModule } from './../pipes/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar/bar.component';
import { YzYFormsModule } from '../form/form.module';
import { QuestionComponent } from './question/question.component';

@NgModule({
    declarations: [BarComponent, QuestionComponent],
    imports: [CommonModule, PipeModule, YzYFormsModule],
    exports: [BarComponent, QuestionComponent]
})
export class LayoutModule {}
