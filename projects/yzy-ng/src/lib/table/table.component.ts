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
import { YzYSort, ColumnTypes } from './models';

@Component({
    selector: 'yzy-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    // tslint:disable-next-line: use-component-view-encapsulation
    // encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnChanges {
    @Input() columns: Column[];
    @Input() items: any[];
    @Input() itemsCount: number;
    @Input() selectedPage: number;
    @Input() itemByPage: number;
    @Input() pageLinkNumber: number;
    @Input() isPaginator: boolean;
    @Input() key: string;
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

    visibleColumns: Column[];
    isSortsVisible = false;
    isFilterVisible = false;
    filter = '';
    columnStyle: string;
    activeSort: { attribute: string; isDesc: boolean } = null;
    displayedItems: any[];

    constructor() {}

    ngOnInit() {
        this.key = (this.key !== undefined)? this.key : 'id';
        this.selectedPage =
            this.selectedPage !== undefined ? this.selectedPage : 1;
        this.itemByPage = this.itemByPage !== undefined ? this.itemByPage : 20;
        this.pageLinkNumber =
            this.pageLinkNumber !== undefined ? this.pageLinkNumber : 3;
        this.itemsCount =
            this.itemsCount !== undefined ? this.itemsCount : this.items.length;
        this.isPaginator =
            this.isPaginator !== undefined ? this.isPaginator : false;
        this.prepareColumns();
        this.applyPaging();
    }
    trackByFn(index, item) {
        return item[this.key];
    }

    ngOnChanges(changes: SimpleChanges) {
        this.prepareColumns();
    }
    prepareColumns() {
        this.visibleColumns = this.columns.filter(c => !c.hide);
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
        this.onSelect.emit(item[this.key]);
    }

    applySearch() {
        this.onFilter.emit(this.filter);
    }

    toggleSort(attribute: string): void {
        if (this.activeSort && this.activeSort.attribute === attribute) {
            if (this.activeSort.isDesc) {
                this.applySort(attribute, false);
            } else {
                this.activeSort = null;
                this.onSort.emit(this.activeSort);
            }
        } else {
            this.applySort(attribute, true);
        }
    }

    applySort(attribute: string, isDesc: boolean) {
        const column = this.columns.find(c => c.attribute === attribute);
        if (column.type === undefined) {
            column.type = ColumnTypes.String;
        }
        if (column.type === ColumnTypes.Dropdown) {
            return; // Sort on dropdown column not supported
        }
        this.activeSort = { attribute, isDesc };
        this.onSort.emit(this.activeSort);

        const sortSystem = {};
        sortSystem['' + ColumnTypes.Number + true] = (a, b) =>
            a[this.activeSort.attribute] - b[this.activeSort.attribute];
        sortSystem['' + ColumnTypes.Number + false] = (a, b) =>
            b[this.activeSort.attribute] - a[this.activeSort.attribute];
        sortSystem['' + ColumnTypes.String + true] = (a, b) =>
            a[this.activeSort.attribute] < b[this.activeSort.attribute]
                ? 1
                : -1;
        sortSystem['' + ColumnTypes.String + false] = (a, b) =>
            a[this.activeSort.attribute] > b[this.activeSort.attribute]
                ? 1
                : -1;

        this.items = this.items.sort(sortSystem['' + column.type + isDesc]);
        this.isSortsVisible = false;


        this.applyPaging();
    }

    selectPage(selectedPage: number) {
        this.selectedPage = selectedPage;
        this.onPageChange.emit(selectedPage);
        this.applyPaging();
    }

    applyPaging(): void {
        this.displayedItems = this.items.slice(
            this.itemByPage * (this.selectedPage - 1),
            this.itemByPage * this.selectedPage
        );
    }
}
