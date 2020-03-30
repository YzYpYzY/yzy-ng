import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormModel } from '../../form';
import { YzYTab } from '../models';

@Component({
  selector: 'yzy-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

    @Input() formModel: FormModel;
    @Input() tabs: YzYTab[];
    @Input() selectedTabName: string;
    @Output() formReady = new EventEmitter<FormGroup>();
    @Output() tabChange = new EventEmitter<YzYTab>();

    selectedTab: YzYTab;

    constructor() { }

    ngOnInit(): void {
        if(this.selectedTabName) {
            const selectedTab = this.tabs.find(t => t.name === this.selectedTabName);
            this.selectedTab = selectedTab ? selectedTab :  this.tabs[0];
        } else {
            this.selectedTab = this.tabs[0];
        }
    }

    handleFormReady(event): void {
        this.formReady.emit(event);
    }

    onTabChange(newTab: YzYTab): void {
        this.selectedTab = newTab;
        this.tabChange.emit(newTab);
    }

}
