import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'yzy-field-error',
    templateUrl: './field-error.component.html',
    styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent implements OnInit {
    @Input() errors: {
        [key: string]: any;
    };

    constructor() {}

    ngOnInit() {}
}
