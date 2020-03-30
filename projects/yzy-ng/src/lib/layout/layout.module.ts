import { PipeModule } from './../pipes/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { YzYFormsModule } from '../form/form.module';

@NgModule({
  declarations: [HeaderBarComponent, FilterBarComponent],
  imports: [
    CommonModule,
    PipeModule,
    YzYFormsModule
  ],
  exports: [HeaderBarComponent,FilterBarComponent]
})
export class LayoutModule { }
