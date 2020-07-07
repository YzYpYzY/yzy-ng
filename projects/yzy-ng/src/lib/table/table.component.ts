import { ElementsValueChanges } from './models/ElementsValueChanges';
import { BaseComponent } from './../base/base.component';
import { YzYAction } from './../models/YzYAction';
import { FooterOptions } from './models/FooterOptions';
import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
    HostBinding,
    ChangeDetectorRef
} from '@angular/core';
import { YzYSort } from './models/YzYSort';
import { TableValueChangeEvent } from './models/TableValueChangeEvent';
import { Column } from './models/Column';
import { ColumnTypes } from './models/ColumnTypes';

@Component({
    selector: 'yzy-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() columns: Column[];
    @Input() items: any[];
    @Input() itemsCount: number;
    @Input() selectedItemId: number | string;
    @Input() selectionMode: string;
    @Input() selectedPage: number;
    @Input() itemByPage: number;
    @Input() pageLinkNumber: number;
    @Input() isPaginator: boolean;
    @Input() footerOptions: FooterOptions;
    @Input() key: string;
    @Input() lineActions: YzYAction[];
    @Input() isFrontDataTreatment: boolean;
    @Input() emptyMessage: string;
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
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onAction = new EventEmitter<{ action: YzYAction; key: string }>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onValueChange = new EventEmitter<TableValueChangeEvent>();

    visibleColumns: Column[];
    sortableColumns: Column[];
    isSortsVisible = false;
    isFilterVisible = false;
    filter = '';
    columnStyle: string;
    rowStyle: string;
    activeSort: { attribute: string; isDesc: boolean } = null;
    sortItems: any[];
    displayedItems: any[];
    sortSystem = {};
    computedStyles: any = {};
    cellsChangedValues: ElementsValueChanges = new ElementsValueChanges();
    selectedItemIdIntern: number | string;
    currentPage: number;

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.key = this.key !== undefined ? this.key : 'id';
        this.selectedPage =
            this.selectedPage !== undefined ? this.selectedPage : 1;
        this.itemByPage = this.itemByPage !== undefined ? this.itemByPage : 20;
        this.pageLinkNumber =
            this.pageLinkNumber !== undefined ? this.pageLinkNumber : 3;
        this.items = this.items ? this.items : [];
        this.itemsCount =
            this.itemsCount !== undefined ? this.itemsCount : this.items.length;
        this.isPaginator =
            this.isPaginator !== undefined ? this.isPaginator : false;
        this.key = this.key !== undefined ? this.key : 'id';
        this.isFrontDataTreatment =
            this.isFrontDataTreatment !== undefined
                ? this.isFrontDataTreatment
                : true;
        this.emptyMessage = this.emptyMessage
            ? this.emptyMessage
            : 'Aucune donnée';
        this.currentPage = this.selectedPage ? this.selectedPage : 1;
        this.prepareSortSystems();
        this.prepareColumns();
        this.applySort();
    }
    prepareSortSystems() {
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
        this.sortSystem = sortSystem;
    }
    trackByFn(index, item) {
        return item[this.key];
    }

    ngOnChanges(changes: SimpleChanges) {
        this.prepareColumns();
        this.applySort();

        if (changes.selectedItemId) {
            this.selectedItemIdIntern = this.selectedItemId;
        }
    }

    setRowStyle() {
        let rowStyle = '';
        if (this.items.length === 0) {
            rowStyle = 'auto 1fr';
        } else {
            rowStyle =
                'auto repeat(' +
                (this.items.length < this.itemByPage
                    ? this.items.length
                    : this.itemByPage) +
                ', auto) 1fr';
        }
        this.rowStyle = rowStyle;
    }

    prepareColumns() {
        this.visibleColumns = this.columns.filter(c => !c.hide);
        this.sortableColumns = this.isFrontDataTreatment
            ? this.visibleColumns.filter(
                  c => c.isSortable && c.type !== ColumnTypes.Dropdown
              )
            : this.visibleColumns.filter(c => c.isSortable);

        let columnStyle = '';
        for (const column of this.visibleColumns) {
            if (typeof column.width === 'number') {
                columnStyle += column.width + 'fr ';
            } else if (typeof column.width === 'string') {
                columnStyle += column.width + ' ';
            } else {
                columnStyle += 'minmax(min-content, auto)  ';
            }
        }
        if (this.lineActions) {
            columnStyle += 'min-content ';
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

    selectE(event, index, item) {
        if(!event.path[0].classList.contains('action') && !event.path[1].classList.contains('action')){
            this.onSelect.emit(item[this.key]);
            if (this.selectionMode === 'simple') {
                this.selectedItemIdIntern = item[this.key];
            }
        }
    }

    applySearch() {
        this.onFilter.emit(this.filter);
    }

    toggleSort(attribute: string): void {
        const column = this.columns.find(c => c.attribute === attribute);
        if (column.isSortable) {
            if (
                this.isFrontDataTreatment &&
                column.type === ColumnTypes.Dropdown
            ) {
                return;
            }
            if (
                this.activeSort == null ||
                this.activeSort.attribute !== attribute
            ) {
                this.activeSort = { attribute, isDesc: true };
            } else {
                if (this.activeSort.isDesc) {
                    this.activeSort.isDesc = false;
                } else {
                    this.activeSort = null;
                }
            }
            this.onSort.emit(this.activeSort);
            this.applySort();
        }
    }

    setSort(attribute: string, isDesc: boolean): void {
        this.activeSort = { attribute, isDesc };
        this.onSort.emit(this.activeSort);
        this.applySort();
    }

    applySort() {
        if (this.items && this.items.length !== undefined) {
            if (this.isFrontDataTreatment && this.activeSort) {
                const column = this.columns.find(
                    c => c.attribute === this.activeSort.attribute
                );
                if (column.type === undefined) {
                    column.type = ColumnTypes.String;
                }
                this.onSort.emit(this.activeSort);
                this.sortItems = [...this.items].sort(
                    this.sortSystem['' + column.type + this.activeSort.isDesc]
                );
            } else {
                this.sortItems = this.items;
            }
            this.isSortsVisible = false;
            this.applyPaging();
        }
    }

    selectPage(selectedPage: number) {
        this.currentPage = selectedPage;
        this.onPageChange.emit(selectedPage);
        this.applyPaging();
    }

    applyPaging(): void {
        if (this.isFrontDataTreatment) {
            this.displayedItems = this.sortItems.slice(
                this.itemByPage * (this.selectedPage - 1),
                this.itemByPage * this.selectedPage
            );
        } else {
            this.displayedItems = this.sortItems;
        }
        this.applyChanges();
        this.computeCellStyles();
        this.setRowStyle();
    }

    applyChanges(): void {
        const displayedItems = [...this.displayedItems];
        // tslint:disable-next-line: forin
        for (const change in this.cellsChangedValues) {
            const item = displayedItems.find(dI =>
                dI[this.key] != null
                    ? dI[this.key].toString() === change
                    : change == null
            );
            if (item) {
                // tslint:disable-next-line: forin
                for (const attribute in this.cellsChangedValues[change]) {
                    item[attribute] = this.cellsChangedValues[change][
                        attribute
                    ];
                }
            }
        }
        this.displayedItems = displayedItems;
    }

    cellValueChange(event, column, item) {
        if (this.cellsChangedValues[item[this.key]] === undefined) {
            this.cellsChangedValues[item[this.key]] = {};
        }
        this.cellsChangedValues[item[this.key]][column.attribute] = event;
        if (column.customStyles !== undefined) {
            this.computedStyles[item[this.key]][
                column.attribute
            ] = column.customStyles(event);
        }
        this.onValueChange.emit({
            totalChanges: this.cellsChangedValues,
            lastChange: {
                id: item[this.key],
                attribute: column.attribute,
                value: event
            }
        });
    }
    handleAction(action: YzYAction, item) {
        this.onAction.emit({ action, key: item[this.key] });
    }
    computeCellStyles(): void {
        const styles = {};
        for (const item of this.displayedItems) {
            styles[item[this.key]] = {};
        }
        for (const column of this.visibleColumns) {
            if (column.customStyles !== undefined) {
                for (const item of this.displayedItems) {
                    styles[item[this.key]][
                        column.attribute
                    ] = column.customStyles(item[column.attribute]);
                }
            }
        }
        this.computedStyles = styles;
    }

    clearChanges(): void {
        this.cellsChangedValues = new ElementsValueChanges();
        this.applySort();
        this.displayedItems = this.displayedItems.map(i => {
            return { ...i };
        });
    }
}
