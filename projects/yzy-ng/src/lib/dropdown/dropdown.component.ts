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
export class DropdownComponent implements OnInit, AfterViewInit {
    @Input() fieldModel: FieldModel;
    @Input() form: FormGroup;
    @Input() width: string;

    @HostBinding('class.is-readonly') isReadOnly = false;
    control: AbstractControl;

    value: any = null;

    displayedValue = ' ';
    displayedWidth;
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
        this.control = this.form.get(this.fieldModel.name);
        this.isReadOnly = !this.control.enabled;

        if (this.width !== undefined) {
            this.displayedWidth = this.width;
        } else {
            this.processAutoSize();
        }
        this.render.addClass(this.elementRef.nativeElement, 'sizeProcessing');
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.setDisplayValue();
        });
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

    processAutoSize() {
        let indexLargerLabel = 0;
        for (let i = 1; i < this.fieldModel.options.length; i++) {
            if (
                this.fieldModel.options[i].label.length >
                this.fieldModel.options[indexLargerLabel].label.length
            ) {
                indexLargerLabel = i;
            }
        }
        this.displayedValue = this.fieldModel.options[indexLargerLabel].label;
    }

    setDisplayValue() {
        this.optionsHeightOpen =
            this.elementRef.nativeElement.children[1].offsetHeight *
                this.fieldModel.options.length +
            'px';
        this.displayedWidth =
            this.elementRef.nativeElement.children[1].offsetWidth + 'px'; // Fix breakline
        this.elementRef.nativeElement.style.width = this.displayedWidth;
        this.optionHeight =
            this.elementRef.nativeElement.children[1].offsetHeight + 'px';
        if (this.control.value) {
            const selectedItem = this.fieldModel.options.find(
                i => i.value == this.control.value
            );
            this.displayedValue = selectedItem ? selectedItem.label : '';
        } else {
            this.displayedValue = '';
        }
        this.optionsHeight = '0';
        this.render.removeClass(
            this.elementRef.nativeElement,
            'sizeProcessing'
        );
    }
}
