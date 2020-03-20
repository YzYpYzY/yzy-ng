import { ActionTypeToClassPipe } from './../pipes/action-type-to-class.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar/header-bar.component';



@NgModule({
  declarations: [HeaderBarComponent, ActionTypeToClassPipe],
  imports: [
    CommonModule
  ],
  providers: [
    ActionTypeToClassPipe
  ],
  exports: [HeaderBarComponent]
})
export class LayoutModule { }
