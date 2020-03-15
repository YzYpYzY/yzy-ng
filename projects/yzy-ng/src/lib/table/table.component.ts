import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
    ViewChild,
    TemplateRef
} from '@angular/core';
import { Column } from './models/Column';
import { YzYSort } from './models';

@Component({
    selector: 'yzy-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
    @Input() columns: Column[];
    @Input() items: any[];
    @Input() key: string;
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onAdd = new EventEmitter<string>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onSelect = new EventEmitter<number>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onSort = new EventEmitter<YzYSort>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onFilter = new EventEmitter<string>();

    sorts: string[];
    visibleColumns: Column[];
    isSortsVisible = false;
    isFilterVisible = false;
    filter = '';
    columnStyle: string;
    constructor() {}

    ngOnInit() {
        this.key = (this.key !== undefined)? this.key : 'id';
        this.prepareColumns();
    }
    trackByFn(index, item) {
        return item[this.key];
    }

    ngOnChanges(changes: SimpleChanges) {
        this.prepareColumns();
    }
    prepareColumns() {
        this.visibleColumns = this.columns.filter(c => !c.hide);
        this.sorts = this.visibleColumns.map(col => col.name);
        let columnStyle = '';
        for (const column of this.visibleColumns) {
            if (typeof column.width === 'number') {
                columnStyle += column.width + 'fr ';
            } else if (typeof column.width === 'string') {
                columnStyle += column.width + ' ';
            } else {
                columnStyle += 'min-content ';
            }
        }
        this.columnStyle = columnStyle;
    }

    toggleSortChoice() {
        this.isSortsVisible = !this.isSortsVisible;
    }

    toggleFilter() {
        this.isFilterVisible = !this.isFilterVisible;
    }

    addE(): void {
        this.onAdd.emit('new');
    }

    selectE(item) {
        this.onSelect.emit(item[this.key]);
    }

    applySearch() {
        this.onFilter.emit(this.filter);
    }

    applySort(attribute: string, isDesc: boolean) {
        this.onSort.emit({ attribute, isDesc });
    }
}
