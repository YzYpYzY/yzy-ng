import { OptionModel } from './../models/OptionModel';
import { Component, OnInit, Input, ElementRef, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'yzy-dropdown-options',
  templateUrl: './dropdown-options.component.html',
  styleUrls: ['./dropdown-options.component.scss']
})
export class DropdownOptionsComponent implements OnInit {

    @Input() displayedOptions:OptionModel[];
    @Input() dropdownService: any;
    @Input() id: number;
    @Input() @HostBinding('style.left.px') x: number;
    @Input() @HostBinding('style.top.px') y: number;
    @Input() @HostBinding('style.width.px') width: number;

    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.collapse();
        }
    }

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
    }

    selectValue(value: OptionModel): void {
        this.dropdownService.close(this.id, value);
    }

    private collapse(): void{
        this.dropdownService.close(this.id);
    }

}
