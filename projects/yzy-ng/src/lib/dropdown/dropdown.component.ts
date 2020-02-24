import {
    Component,
    OnInit,
    Input,
    ElementRef,
    Renderer2,
    HostListener,
    AfterViewInit,
    HostBinding
} from '@angular/core';
import { OptionModel } from './models/OptionModel';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FieldModel } from '../field/models/FieldModel';

@Component({
    selector: 'yzy-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() fieldModel: FieldModel;
    @Input() form: FormGroup;
    @Input() width: string;

    @HostBinding('class.is-readonly') isReadOnly = false;
    control: AbstractControl;
    displayedValue = ' ';
    displayedWidth;
    displayedOptions = null;
    isCollapsed = true;

    optionsHeight = 'auto';
    optionHeight = 'auto';
    optionsHeightOpen = '0';

    constructor(private elementRef: ElementRef, private render: Renderer2) {}

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.collapse();
        }
    }

    ngOnInit(): void {
        this.render.addClass(this.elementRef.nativeElement, 'sizeProcessing');
        this.control = this.form.get(this.fieldModel.name);
        this.setOptions();
        this.isReadOnly = !this.control.enabled;

        if (this.width !== undefined) {
            this.displayedWidth = this.width;
            this.processAutoHeigth();
        } else {
            this.processAutoWidth();
        }
    }

    changeValue(event: OptionModel) {
        this.control.setValue(event.value);
        this.displayedValue = event.label;
        this.collapse();
    }

    toggle() {
        if (!this.control.disabled) {
            if (this.isCollapsed) {
                this.open();
            } else {
                this.collapse();
            }
        }
    }

    collapse() {
        this.isCollapsed = true;
        this.optionsHeight = '0';
    }

    open() {
        this.isCollapsed = false;
        this.optionsHeight = this.optionsHeightOpen;
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
            this.elementRef.nativeElement.children[1].offsetWidth + 'px'; // Fix breakline
        this.elementRef.nativeElement.style.width = this.displayedWidth;

        this.processAutoHeigth();
    }

    processAutoHeigth() {
        this.optionsHeightOpen =
            this.elementRef.nativeElement.children[1].offsetHeight *
                this.displayedOptions.length +
            'px';
        this.optionHeight =
            this.elementRef.nativeElement.children[1].offsetHeight + 'px';
        this.setDisplayValue();
    }

    setDisplayValue() {
        const selectedItem = this.displayedOptions.find(
            i => i.value === this.control.value
        );
        this.displayedValue = selectedItem ? selectedItem.label : '';

        this.optionsHeight = '0';
        this.render.removeClass(
            this.elementRef.nativeElement,
            'sizeProcessing'
        );
    }

    setOptions() {
        const options = this.fieldModel.options.map(o => ({ ...o }));
        if (
            this.fieldModel.value === undefined ||
            options.findIndex(o => o.value === this.fieldModel.value) === -1
        ) {
            const nullOption = { value: null, label: ' ', class: 'empty' };
            options.unshift(nullOption);
            this.changeValue(nullOption);
        }
        this.displayedOptions = options;
    }
}
