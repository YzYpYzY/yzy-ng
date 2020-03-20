import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YzYAction } from '../../models'
@Component({
  selector: 'yzy-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

    @Input() title: string;
    @Input() actions: YzYAction[];
    @Output() action = new EventEmitter<YzYAction>();

    constructor() { }

    ngOnInit(): void {
    }

    triggerAction(action: YzYAction): void {
        if(!action.disabled){
            this.action.emit(action);
        }
    }

}
