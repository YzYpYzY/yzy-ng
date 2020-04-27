import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormModel } from '../../form/models/FormModel';
import { YzYTab } from '../models/YzYTab';
import { YzYAction } from '../../models/YzYAction';

@Component({
    selector: 'yzy-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
    @Input() title: string;
    @Input() actions: YzYAction[];
    @Input() formModel: FormModel;
    @Input() tabs: YzYTab[];
    @Input() selectedTabName: string;
    @Output() formReady = new EventEmitter<FormGroup>();
    @Output() tabChange = new EventEmitter<YzYTab>();
    @Output() action = new EventEmitter<YzYAction>();

    selectedTab: YzYTab;

    constructor() {}

    ngOnInit(): void {
        if (this.formModel) {
            this.formModel.isInline = true;
        }
        if (this.tabs !== undefined) {
            if (this.selectedTabName) {
                const selectedTab = this.tabs.find(
                    t => t.name === this.selectedTabName
                );
                this.selectedTab = selectedTab ? selectedTab : this.tabs[0];
            } else {
                this.selectedTab = this.tabs[0];
            }
        }
    }

    handleFormReady(event): void {
        this.formReady.emit(event);
    }

    onTabChange(newTab: YzYTab): void {
        this.selectedTab = newTab;
        this.tabChange.emit(newTab);
    }

    triggerAction(action: YzYAction): void {
        if (!action.disabled) {
            this.action.emit(action);
        }
    }
}
