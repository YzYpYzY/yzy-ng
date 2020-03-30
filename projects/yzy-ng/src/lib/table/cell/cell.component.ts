import { Column } from '../models/Column';
import { FieldModel } from './../../field/models/FieldModel';
import { FormGroup } from '@angular/forms';
import {
    Component,
    OnInit,
    Input,
    HostBinding,
    HostListener,
    EventEmitter,
    Output,
    ViewChildren,
    QueryList,
    ElementRef,
    ChangeDetectorRef,
    Renderer2
} from '@angular/core';
import { ColumnTypes } from '../models/ColumnTypes';

@Component({
    selector: 'yzy-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
    @Input() column: Column;
    @Input() value: string | number;
    @Output() valueChange = new EventEmitter<string | number>();

    @HostBinding('class.editable') displayedAsEditable = false;
    @HostBinding('class.in-edition') inEdition = false;
    @HostBinding('class.value-changed') isValueChanged = false;

    @ViewChildren('field') fields:QueryList<ElementRef>;
    form: FormGroup;
    fieldModel: FieldModel;
    displayValue: string | number;
    cellWidth: number;
    initialValue: string | number;

    ColumnTypes = ColumnTypes;
    constructor(private cdr: ChangeDetectorRef, private elRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('click', ['$event']) onClick(event) {
        if (this.column.editable && !this.inEdition) {
            this.cellWidth = this.elRef.nativeElement.children[0].getBoundingClientRect().width;
            this.inEdition = true;
            this.cdr.detectChanges();
            if(this.column.type === ColumnTypes.Dropdown){
                setTimeout(()=> { (this.fields.first as any).toggle(event); });
                //(this.fields.first as any).toggle(event);
            } else if(this.column.type === ColumnTypes.Boolean){
                //setTimeout(()=> { (this.fields.first as any).toggleValue(event); });
                (this.fields.first as any).toggleValue(event);
            }
            else {
                this.fields.first.nativeElement.focus();
            }
        }
    }
    ngOnInit(): void {
        if (this.column.type === ColumnTypes.Dropdown) {
            const index = this.column.options.findIndex(
                o => o.value === this.value
            );
            this.displayValue =
                index !== -1 ? this.column.options[index].label : '';
        } else {
            this.displayValue = this.value;
        }
        this.displayedAsEditable = this.column.editable;
        this.initialValue = this.value;
        // for(let style of this.column.customStyles(this.value)){
        //     this.renderer.setStyle(this.elRef.nativeElement, style);
        // }
    }

    valueChangeHandler(event){
        if(this.column.type === ColumnTypes.Dropdown){
            this.isValueChanged = this.initialValue !== event.value;
            this.valueChange.emit(event.value);
        } else {
            this.isValueChanged = this.initialValue !== event;
            this.valueChange.emit(event);
        }
    }
}
