import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

const PAGENUMBER = 5;

@Component({
    selector: 'yzy-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
    @Input() count: number;
    @Input() itemByPage: number;
    @Input() selectedPage: number;
    @Output() changePage = new EventEmitter<number>();

    currentPage: number;
    lastPage: number;
    pagesDisplayed: number[];
    constructor() {}

    ngOnInit(): void {
        this.currentPage = this.selectedPage ? this.selectedPage : 1;
        this.lastPage = this.count / this.itemByPage + 1;
        this.setPagesDisplayed();
    }

    changePageE(pageMove): void {
        if (pageMove === '-1') {
            if (this.currentPage !== 1) {
                this.currentPage--;
                this.changePage.emit(this.currentPage);
                this.setPagesDisplayed();
            }
        } else if (pageMove === '+1') {
            if (this.currentPage !== this.lastPage) {
                this.currentPage++;
                this.changePage.emit(this.currentPage);
                this.setPagesDisplayed();
            }
        } else {
            if (this.currentPage !== pageMove) {
                this.currentPage = pageMove;
                this.changePage.emit(this.currentPage);
                this.setPagesDisplayed();
            }
        }
    }
    setPagesDisplayed(): void {
        const pagesDisplayed = [];
        if (this.currentPage <= PAGENUMBER / 2 + 1) {
            for (let i = 1; i < PAGENUMBER + 1; i++) {
                pagesDisplayed.push(i);
            }
        } else if (this.currentPage >= this.lastPage - (PAGENUMBER / 2 + 1)) {
            for (let i = this.lastPage - PAGENUMBER; i <= this.lastPage; i++) {
                pagesDisplayed.push(i);
            }
        } else {
            for (
                let i = this.currentPage - PAGENUMBER / 2;
                i < this.currentPage + PAGENUMBER / 2 + 1;
                i++
            ) {
                pagesDisplayed.push(i);
            }
        }
        this.pagesDisplayed = [...pagesDisplayed];
    }
}
