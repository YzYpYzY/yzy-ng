import { OptionModel } from './../dropdown/models/OptionModel';
import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    HostBinding,
    ElementRef
} from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { FieldModel } from '../field/models/FieldModel';
import { DisplayDate } from './models/DisplayDate';
import { DateSelectorService } from './date-selector.service';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'yzy-date-selector',
    templateUrl: './date-selector.component.html',
    styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent extends BaseComponent implements OnInit {
    @Input() fieldModel: FieldModel;
    @Input() form: FormGroup;

    @Input() label: string;
    @Input() value: string;
    @Input() extraOptions: OptionModel[];
    @Input() separator: string;
    @Input() changeAsDate: boolean;

    @Input() width: string;
    @Output() valueChange = new EventEmitter<string | number | Date>();

    @HostBinding('class.is-readonly') isReadOnly = false;

    control: AbstractControl;
    displayedLabel = null;
    initialValue: string;
    date: DisplayDate;
    isCollapsed = true;
    calendarId: number;
    stateSubscription: Subscription;
    selectedExtraOption: OptionModel = null;

    constructor(
        private calendarService: DateSelectorService,
        private elementRef: ElementRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.displayedLabel =
            this.label !== undefined
                ? this.label
                : this.fieldModel && this.fieldModel.label
                ? this.fieldModel.label
                : null;
        this.extraOptions =
            this.extraOptions !== undefined
                ? this.extraOptions
                : this.fieldModel && this.fieldModel.options
                ? this.fieldModel.options
                : null;
        this.separator = this.separator !== undefined ? this.separator : '/';
        this.changeAsDate =
            this.changeAsDate !== undefined ? this.changeAsDate : false;
        const controlName =
            this.fieldModel && this.fieldModel.name
                ? this.fieldModel.name
                : 'default';
        if (this.form === undefined) {
            this.form = new FormGroup({});
            this.form.addControl(controlName, new FormControl(''));
        }
        this.control = this.form.get(controlName);
        this.isReadOnly = !this.control.enabled;
        this.initialValue = this.value
            ? this.value
            : this.control.value
            ? this.control.value
            : null;
        this.setDateValues(this.initialValue);
    }

    setDateValues(value: string): void {
        let newDate;
        if (value == null) {
            const now = new Date();
            newDate = {
                day: now.getUTCDate(),
                month: now.getMonth() + 1,
                year: now.getFullYear()
            };
        } else {
            const parts = value.split(this.separator);
            newDate = {
                day: parseInt(parts[0], 10),
                month: parseInt(parts[1], 10),
                year: parseInt(parts[2], 10)
            };
        }
        this.date = this.refreshToDisplayDateValues(newDate);
    }

    refreshToDisplayDateValues(value: DisplayDate): DisplayDate {
        const newValue = { ...value };
        newValue.dayToDisplay =
            newValue.day < 10 ? '0' + newValue.day : '' + newValue.day;
        newValue.monthToDisplay =
            newValue.month < 10 ? '0' + newValue.month : '' + newValue.month;
        newValue.yearToDisplay =
            newValue.year < 10
                ? '000' + newValue.year
                : newValue.year < 100
                ? '00' + newValue.year
                : newValue.year < 1000
                ? '0' + newValue.year
                : '' + newValue.year;
        return newValue;
    }

    focusOut(): void {
        this.calendarService.close(this.calendarId);
    }

    toggleCalendar(): void {
        if (!this.control.disabled) {
            if (this.isCollapsed) {
                this.stateSubscription = this.calendarService.calendarState$
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(newState => {
                        if (newState.value !== null) {
                            this.changeValue(newState.value);
                        }
                        this.isCollapsed = !newState.isOpen;
                        if (this.isCollapsed) {
                            this.stateSubscription.unsubscribe();
                            this.stateSubscription = null;
                        }
                    });
                const displayBox = this.elementRef.nativeElement.children[
                    this.elementRef.nativeElement.children.length - 1
                ];
                const domRect = displayBox.getBoundingClientRect();
                this.calendarId = this.calendarService.displayCalendar(
                    this.date,
                    this.extraOptions,
                    { x: domRect.left, y: domRect.top + domRect.height },
                    displayBox.offsetWidth
                );
            }
        }
    }

    changeValue(newValue): void {
        if (newValue.label !== undefined) {
            this.selectedExtraOption = newValue;
            this.valueChange.emit(this.selectedExtraOption.value);
        } else {
            this.selectedExtraOption = null;
            this.date = this.refreshToDisplayDateValues(newValue);
            if (this.changeAsDate) {
                const date = new Date(
                    this.date.year,
                    this.date.month,
                    this.date.day
                );
                this.valueChange.emit(date);
            } else {
                this.valueChange.emit(
                    this.date.day +
                        this.separator +
                        this.date.monthToDisplay +
                        this.separator +
                        this.date.yearToDisplay
                );
            }
        }
    }
}
