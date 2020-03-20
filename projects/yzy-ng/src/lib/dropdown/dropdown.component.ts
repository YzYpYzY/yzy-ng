import { BaseComponent } from './../base/base.component';
import { DropdownService } from './dropdown.service';
import {
    Component,
    OnInit,
    Input,
    ElementRef,
    Renderer2,
    HostListener,
    AfterViewInit,
    HostBinding,
    Output,
    EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import { OptionModel } from './models/OptionModel';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { FieldModel } from '../field/models/FieldModel';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'yzy-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends BaseComponent implements OnInit {
    @Input() fieldModel: FieldModel;
    @Input() form: FormGroup;

    @Input() label: string;
    @Input() selectedValue: string;
    @Input() options: OptionModel[];

    @Input() width: string;
    @Input() isNullOption: boolean;
    @Output() valueChange = new EventEmitter<OptionModel>();

    @HostBinding('class.is-readonly') isReadOnly = false;
    control: AbstractControl;
    displayedValue = ' ';
    displayedWidth;
    displayedOptions = null;
    displayedLabel = null;
    isCollapsed = true;
    stateSubscription: Subscription;
    optionsId: number;
    initialOption: OptionModel;

    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private render: Renderer2, private dropdownService: DropdownService) { super(); }

    ngOnInit(): void {
        this.render.addClass(this.elementRef.nativeElement, 'sizeProcessing');
        this.displayedLabel = this.label !== undefined ? this.label :
            this.fieldModel && this.fieldModel.label ? this.fieldModel.label : null;
            this.cdr.detectChanges();
        this.setOptions();
        const controlName = this.fieldModel && this.fieldModel.name ? this.fieldModel.name : 'default';
        if(this.form === undefined){
            this.form = new FormGroup({});
            this.form.addControl(controlName, new FormControl(this.initialOption.value));
        }
        this.control = this.form.get(controlName);
        this.isReadOnly = !this.control.enabled;
        if (this.width !== undefined) {
            this.displayedWidth = this.width;
            this.setDisplayValue();
        } else {
            this.processAutoWidth();
        }
    }

    changeValue(event: OptionModel) {
        this.control.setValue(event.value);
        this.valueChange.emit(event);
        this.displayedValue = event.label;
    }

    toggle(event) {
        if (!this.control.disabled) {
            if (this.isCollapsed) {
                this.stateSubscription = this.dropdownService.optionsState$.pipe(takeUntil(this.destroy$)).subscribe(newState => {
                    if(newState.selectedOption !== null){
                        this.changeValue(newState.selectedOption);
                    }
                    this.isCollapsed = !newState.isOpen;
                    if(this.isCollapsed){
                        this.stateSubscription.unsubscribe();
                        this.stateSubscription = null;
                    }
                });
                const displayBox = this.elementRef.nativeElement.children[this.elementRef.nativeElement.children.length - 1];
                const domRect = displayBox.getBoundingClientRect();
                this.optionsId = this.dropdownService.displayOptions(
                    this.displayedOptions,
                    { x: domRect.left, y: domRect.top+domRect.height },
                    displayBox.offsetWidth);
            }
        }
    }

    focusOut(): void{
        this.dropdownService.close(this.optionsId);
    }

    processAutoWidth() {
        let indexLargerLabel = 0;
        for (let i = 1; i < this.displayedOptions.length; i++) {
            if (
                this.displayedOptions[i].label.length >
                this.displayedOptions[indexLargerLabel].label.length
            ) {
                indexLargerLabel = i;
            }
        }
        this.displayedValue = this.displayedOptions[indexLargerLabel].label;
        this.displayedWidth =
            this.elementRef.nativeElement.children[this.elementRef.nativeElement.children.length - 1].offsetWidth + 'px'; // Fix breakline
            this.elementRef.nativeElement.style.width = this.displayedWidth;

        this.setDisplayValue();
    }

    setDisplayValue() {
        const selectedItem = this.displayedOptions.find(
            i => i.value === this.control.value
        );
        this.displayedValue = selectedItem ? selectedItem.label : '';

        this.render.removeClass(
            this.elementRef.nativeElement,
            'sizeProcessing'
        );
    }

    setOptions() {
        const options = (this.options !== undefined) ? this.options.map(o => ({ ...o })) : this.fieldModel.options.map(o => ({ ...o }));
        if(this.selectedValue !== undefined){
            this.initialOption = options.find(o => o.value === this.selectedValue);
        } else if(this.fieldModel && this.fieldModel.value !== undefined){
            this.initialOption = options.find(o => o.value === this.fieldModel.value);
        }
        if(this.initialOption == null || this.isNullOption)
        {
            const nullOption = { value: null, label: ' ', class: 'empty' };
            options.unshift(nullOption);
            if(this.initialOption == null){
                this.initialOption = nullOption;
            }
        }
        this.displayedOptions = options;
    }
}
