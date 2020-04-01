import { CheckboxModule } from './../checkbox/checkbox.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';



@NgModule({
  declarations: [RadioComponent],
  imports: [
    CommonModule,
    CheckboxModule,
  ],
  exports: [
    RadioComponent
  ]
})
export class RadioModule { }
