import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSelectorComponent } from './date-selector.component';
import { DateSelectorCalendarComponent } from './date-selector-calendar/date-selector-calendar.component';

@NgModule({
    declarations: [DateSelectorComponent, DateSelectorCalendarComponent],
    imports: [CommonModule],
    exports: [DateSelectorComponent, DateSelectorCalendarComponent],
    entryComponents: [DateSelectorCalendarComponent]
})
export class DateSelectorModule {}
