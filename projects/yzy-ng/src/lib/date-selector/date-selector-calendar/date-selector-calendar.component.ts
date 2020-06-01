import { OptionModel } from './../../dropdown/models/OptionModel';
import { DisplayDate } from '../models/DisplayDate';
import {
    Component,
    OnInit,
    Input,
    HostBinding,
    HostListener,
    ElementRef
} from '@angular/core';
import { DayChoice } from '../models/DayChoice';

@Component({
    selector: 'yzy-date-selector-calendar',
    templateUrl: './date-selector-calendar.component.html',
    styleUrls: ['./date-selector-calendar.component.scss']
})
export class DateSelectorCalendarComponent implements OnInit {
    @Input() date: DisplayDate;
    @Input() selectedOption: OptionModel;
    @Input() extraOptions: OptionModel[];
    @Input() calendarService: any;
    @Input() id: number;
    @Input() isReset: boolean;
    @Input() @HostBinding('style.left.px') x: number;
    @Input() @HostBinding('style.top.px') y: number;
    @Input() @HostBinding('style.min-width.px') minWidth: number;
    currentDate: DisplayDate;
    selectedValue: DisplayDate | OptionModel;
    dayChoices: {
        value: number | string;
        disabled?: boolean;
        selected?: boolean;
    }[];

    monthLabels = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre'
    ];
    dayLabels = ['l', 'm', 'm', 'j', 'v', 's', 'd'];
    dayShift: number;

    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        if (
            !event['keepCalendarOpen'] &&
            !this.elementRef.nativeElement.contains(event.target)
        ) {
            this.cancel(event);
        }
    }
    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.currentDate = { ...this.date };
        this.selectedValue = this.selectedOption
            ? this.selectedOption
            : this.currentDate;
        this.isReset = this.isReset ? this.isReset : true;
        this.setDayCount();
        this.calendarService.newValue(this.id, this.selectedValue);
    }

    changeYear(move: number): void {
        const year = this.currentDate.year + move;
        this.currentDate = { ...this.currentDate, year };
        this.setDayCount();
        this.selectedValue = this.currentDate;
        this.calendarService.newValue(this.id, this.currentDate);
    }
    changeMonth(move: number): void {
        if (move === -1 && this.currentDate.month === 1) {
            this.currentDate.month = 12;
        } else if (move === 1 && this.currentDate.month === 12) {
            this.currentDate.month = 1;
        } else {
            this.currentDate.month += move;
        }
        this.setDayCount();
        this.selectedValue = this.currentDate;
        this.calendarService.newValue(this.id, this.selectedValue);
    }
    selectDay(day: number) {
        if (day) {
            this.dayChoices[
                this.currentDate.day - 1 + this.dayShift
            ].selected = false;
            this.currentDate.day = day;
            this.dayChoices[day - 1 + this.dayShift].selected = true;
        }
        this.selectedValue = this.currentDate;
        this.calendarService.newValue(this.id, this.selectedValue);
    }
    selectExtraOption(event, option: OptionModel): void {
        event['keepCalendarOpen'] = true;

        if (this.currentDate.day != null) {
            this.dayChoices[this.currentDate.day + 1].selected = false;
            this.currentDate.day = null;
        }
        this.selectedValue = option;
        this.calendarService.newValue(this.id, this.selectedValue);
    }

    valid(event) {
        event['keepCalendarOpen'] = true;
        this.calendarService.close(this.id, this.selectedValue, true);
    }

    cancel(event) {
        event['keepCalendarOpen'] = true;
        this.calendarService.close(this.id, this.date);
    }

    reset(): void {
        this.calendarService.newValue(this.id, null);
    }

    private collapse(): void {
        this.calendarService.close(this.id);
    }

    private setDayCount() {
        const dayChoices: DayChoice[] = [];

        this.dayShift = this.firstDayOfMonth(
            this.currentDate.year,
            this.currentDate.month
        );

        for (let i = 0; i < this.dayShift; i++) {
            dayChoices.push({ value: '', disabled: true });
        }
        let monthDays = 0;
        if (this.currentDate.month === 2) {
            monthDays =
                this.currentDate.year % 400 === 0
                    ? 29
                    : this.currentDate.year % 100 === 0
                    ? 28
                    : this.currentDate.year % 4 === 0
                    ? 29
                    : 28;
        } else {
            if (this.currentDate.month % 2 === 0) {
                monthDays = 30;
            } else {
                monthDays = 31;
            }
        }
        for (let i = 1; i <= monthDays; i++) {
            dayChoices.push({ value: i });
        }
        if (
            dayChoices[this.currentDate.day - 1 + this.dayShift] === undefined
        ) {
            this.currentDate.day = 1;
        }
        if (this.selectedOption == null) {
            dayChoices[
                this.currentDate.day - 1 + this.dayShift
            ].selected = true;
        }
        this.dayChoices = dayChoices;
    }

    private firstDayOfMonth(year: number, month: number): number {
        const firstDayWithSundayFirst = new Date(year, month - 1, 1).getDay();

        return firstDayWithSundayFirst === 0
            ? 6
            : firstDayWithSundayFirst === 6
            ? 0
            : firstDayWithSundayFirst - 1;
    }
}
