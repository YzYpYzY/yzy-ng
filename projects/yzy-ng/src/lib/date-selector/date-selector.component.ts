import { OptionModel } from './../dropdown/models/OptionModel';
import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    HostBinding,
    ElementRef,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { FieldModel } from '../field/models/FieldModel';
import { DisplayDate } from './models/DisplayDate';
import { DateSelectorService } from './date-selector.service';
import { Subscription } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { BaseComponent } from '../base/base.component';
import { CalendarState } from './models/CalendarState';

@Component({
    selector: 'yzy-date-selector',
    templateUrl: './date-selector.component.html',
    styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent extends BaseComponent
    implements OnInit, AfterViewInit {
    @Input() fieldModel: FieldModel;
    @Input() form: FormGroup;

    @Input() label: string;
    @Input() value: string;
    @Input() extraOptions: OptionModel[];
    @Input() separator: string;
    @Input() format: 'date' | 'eu' | 'us' | 'iso';
    @Input() displayFormat: 'eu' | 'us' | 'iso';

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
    isEmpty = true;
    isFirstSelection = true;

    constructor(
        private calendarService: DateSelectorService,
        private elementRef: ElementRef,
        private cdr: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.displayedLabel = this.label
            ? this.label
            : this.fieldModel && this.fieldModel.label
            ? this.fieldModel.label
            : null;
        this.extraOptions = this.extraOptions
            ? this.extraOptions
            : this.fieldModel && this.fieldModel.options
            ? this.fieldModel.options
            : null;
        this.format = this.format
            ? this.format
            : this.fieldModel &&
              this.fieldModel.dateOptions &&
              this.fieldModel.dateOptions.format
            ? this.fieldModel.dateOptions.format
            : 'iso';
        this.displayFormat = this.displayFormat
            ? this.displayFormat
            : this.fieldModel &&
              this.fieldModel.dateOptions &&
              this.fieldModel.dateOptions.displayFormat
            ? this.fieldModel.dateOptions.displayFormat
            : 'iso';
        this.separator = this.separator
            ? this.separator
            : this.fieldModel &&
              this.fieldModel.dateOptions &&
              this.fieldModel.dateOptions.separator
            ? this.fieldModel.dateOptions.separator
            : '/';
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
            : this.fieldModel && this.fieldModel.value
            ? this.fieldModel.value
            : null;

        if (!this.validDateFormat(this.initialValue)) {
            if (this.extraOptions) {
                this.selectedExtraOption = this.extraOptions.find(
                    o => o.value === this.initialValue
                );
            }
            this.initialValue = null;
        }
        this.isEmpty =
            this.initialValue == null && this.selectedExtraOption == null;
        this.setDateValues(this.initialValue);
    }

    ngAfterViewInit(): void {}

    setDateValues(value: string | Date): void {
        let newDate;
        if (value == null || this.format === 'date') {
            let dateValue: Date;
            if (!value) {
                dateValue = new Date();
            } else {
                if (typeof value === 'string') {
                    dateValue = new Date(value);
                } else {
                    dateValue = value;
                }
            }
            newDate = {
                day: dateValue.getUTCDate(),
                month: dateValue.getMonth() + 1,
                year: dateValue.getFullYear()
            };
        } else {
            const parts = (value as string).split(this.separator);
            switch (this.format) {
                case 'iso':
                    newDate = {
                        day: parseInt(parts[2], 10),
                        month: parseInt(parts[1], 10),
                        year: parseInt(parts[0], 10)
                    };
                    break;
                case 'eu':
                    newDate = {
                        day: parseInt(parts[0], 10),
                        month: parseInt(parts[1], 10),
                        year: parseInt(parts[2], 10)
                    };
                    break;
                case 'us':
                    newDate = {
                        day: parseInt(parts[1], 10),
                        month: parseInt(parts[0], 10),
                        year: parseInt(parts[2], 10)
                    };
                    break;
            }
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
                    .subscribe((newState: CalendarState) => {
                        this.changeValue(newState);
                        this.isCollapsed = !newState.isOpen;
                        if (this.isCollapsed) {
                            this.stateSubscription.unsubscribe();
                            this.stateSubscription = null;
                            if (!newState.isValidate) {
                                if (
                                    this.initialValue == null &&
                                    this.selectedExtraOption == null
                                ) {
                                    this.isEmpty = true;
                                    this.control.setValue(null);
                                } else {
                                    this.control.setValue(
                                        this.selectedExtraOption.value
                                    );
                                }
                            }
                        }
                        this.cdr.detectChanges();
                    });
                const displayBox = this.elementRef.nativeElement.children[
                    this.elementRef.nativeElement.children.length - 1
                ];
                const domRect = displayBox.getBoundingClientRect();
                this.calendarId = this.calendarService.displayCalendar(
                    this.date,
                    this.selectedExtraOption,
                    this.extraOptions,
                    { x: domRect.left, y: domRect.top + domRect.height },
                    displayBox.offsetWidth
                );
            }
        }
    }

    changeValue(newState: CalendarState): void {
        console.log(newState);

        let result;
        if (!newState || !newState.value) {
            result = null;
            this.isEmpty = true;
            this.selectedExtraOption = null;
        } else if ((newState.value as OptionModel).label !== undefined) {
            this.selectedExtraOption = newState.value as OptionModel;
            result = this.selectedExtraOption.value;
            this.isEmpty = false;
        } else {
            this.selectedExtraOption = null;
            if (newState == null || newState.value == null) {
            } else {
                this.date = this.refreshToDisplayDateValues(
                    newState.value as DisplayDate
                );
                this.isEmpty = false;

                switch (this.format) {
                    case 'date':
                        result = new Date(
                            Date.UTC(
                                this.date.year,
                                this.date.month - 1,
                                this.date.day
                            )
                        );
                        break;
                    case 'us':
                        result =
                            this.date.monthToDisplay +
                            this.separator +
                            this.date.dayToDisplay +
                            this.separator +
                            this.date.yearToDisplay;
                        break;
                    case 'iso':
                        result =
                            this.date.yearToDisplay +
                            this.separator +
                            this.date.monthToDisplay +
                            this.separator +
                            this.date.dayToDisplay;
                        break;
                    case 'eu':
                        result =
                            this.date.dayToDisplay +
                            this.separator +
                            this.date.monthToDisplay +
                            this.separator +
                            this.date.yearToDisplay;
                        break;
                }
            }
        }
        this.control.setValue(result);
        this.valueChange.emit(result);
    }

    private validDateFormat(value): boolean {
        if (value) {
            const parts = value.split(this.separator);
            if (parts.length === 3) {
                return (
                    !isNaN(parseInt(parts[0], 10)) &&
                    !isNaN(parseInt(parts[1], 10)) &&
                    !isNaN(parseInt(parts[2], 10))
                );
            }
        }
        return false;
    }
}
