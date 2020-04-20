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
    @Input() calendarService: any;
    @Input() id: number;
    @Input() @HostBinding('style.left.px') x: number;
    @Input() @HostBinding('style.top.px') y: number;
    @Input() @HostBinding('style.min-width.px') minWidth: number;
    currentDate: DisplayDate;
    selectedValue: DisplayDate | string;
    dayChoices: {
        value: number | string;
        disabled?: boolean;
        selected?: boolean;
    }[];

    extraOptions: { value: string; selected?: boolean }[] = [
        { value: 'Pas de retour' }
    ];

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
        this.setDayCount();
    }

    changeYear(move: number): void {
        const year = this.currentDate.year + move;
        this.currentDate = { ...this.currentDate, year };
        this.selectedValue = this.currentDate;
        this.setDayCount();
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
        this.selectedValue = this.currentDate;
        this.setDayCount();
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
        this.extraOptions = this.extraOptions.map(o => ({
            ...o,
            selected: false
        }));
        this.selectedValue = this.currentDate;
        this.calendarService.newValue(this.id, this.selectedValue);
    }
    selectExtraOption(event, optionIndex: number): void {
        event['keepCalendarOpen'] = true;

        if (this.currentDate.day != null) {
            this.dayChoices[this.currentDate.day + 1].selected = false;
            this.currentDate.day = null;
        }
        this.extraOptions = this.extraOptions.map(o => ({
            ...o,
            selected: false
        }));
        this.extraOptions[optionIndex].selected = true;
        this.selectedValue = this.extraOptions[optionIndex].value;
        this.calendarService.newValue(this.id, this.selectedValue);
    }

    valid(event) {
        event['keepCalendarOpen'] = true;
        this.calendarService.close(this.id, this.selectedValue);
    }

    cancel(event) {
        event['keepCalendarOpen'] = true;
        this.calendarService.close(this.id, this.date);
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
        dayChoices[this.currentDate.day - 1 + this.dayShift].selected = true;
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