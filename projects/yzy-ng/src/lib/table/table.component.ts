import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
    ViewChild,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { Column } from './models/Column';
import { YzYSort } from './models';

@Component({
    selector: 'yzy-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    // tslint:disable-next-line: use-component-view-encapsulation
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnChanges {
    @Input() columns: Column[];
    @Input() items: any[];
    @Input() itemsCount: number;
    @Input() selectedPage: number;
    @Input() itemByPage: number;
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onAdd = new EventEmitter<string>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onSelect = new EventEmitter<number>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onSort = new EventEmitter<YzYSort>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onFilter = new EventEmitter<string>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onPageChange = new EventEmitter<number>();

    sorts: string[];
    visibleColumns: Column[];
    isSortsVisible = false;
    isFilterVisible = false;
    filter = '';
    columnStyle: string;
    constructor() {}

    ngOnInit() {
        this.selectedPage =
            this.selectedPage !== undefined ? this.selectedPage : 1;
        this.itemByPage = this.itemByPage !== undefined ? this.itemByPage : 20;
        this.prepareColumns();
    }
    trackByFn(index, item) {
        return item.id;
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
        console.log(this.items);
    }

    selectE(item) {
        this.onSelect.emit(item.id);
    }

    applySearch() {
        this.onFilter.emit(this.filter);
    }

    applySort(attribute: string, isDesc: boolean) {
        this.onSort.emit({ attribute, isDesc });
    }

    selectPage(selectedPage: number) {
        this.onPageChange.emit(selectedPage);
    }
}
