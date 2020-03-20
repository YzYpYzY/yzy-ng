import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormModel } from '../../form';

@Component({
  selector: 'yzy-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

    @Input() formModel: FormModel;
    @Output() formReady = new EventEmitter<FormGroup>();

    constructor() { }

    ngOnInit(): void {
    }

    handleFormReady(event): void {
        this.formReady.emit(event);
    }

}
