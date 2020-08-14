import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    SimpleChanges,
    OnChanges
} from '@angular/core';

@Component({
    selector: 'yzy-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
    @Input() count: number;
    @Input() itemByPage: number;
    @Input() selectedPage: number;
    @Input() pageLinkNumber: number;
    @Output() changePage = new EventEmitter<number>();

    currentPage: number;
    lastPage: number;
    pagesDisplayed: number[];
    constructor() {}

    ngOnInit(): void {
        this.pageLinkNumber = this.pageLinkNumber ? this.pageLinkNumber : 3;
        this.currentPage = this.selectedPage ? this.selectedPage : 1;
        this.calculateLastPage();
        this.setPagesDisplayed();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.calculateLastPage();
        this.setPagesDisplayed();
    }

    calculateLastPage(){
        const lastPage = Math.trunc(this.count / this.itemByPage);
        this.lastPage = this.count % this.itemByPage == 0 ? lastPage : lastPage + 1;
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
        if (this.lastPage < this.pageLinkNumber) {
            for (let i = 1; i <= this.lastPage; i++) {
                pagesDisplayed.push(i);
            }
        } else if (this.currentPage <= (this.pageLinkNumber - 1) / 2 + 1) {
            for (let i = 1; i < this.pageLinkNumber + 1; i++) {
                pagesDisplayed.push(i);
            }
        } else if (
            this.currentPage >=
            this.lastPage - ((this.pageLinkNumber - 1) / 2 + 1)
        ) {
            for (
                let i = this.lastPage + 1 - this.pageLinkNumber;
                i <= this.lastPage;
                i++
            ) {
                pagesDisplayed.push(i);
            }
        } else {
            for (
                let i = this.currentPage - (this.pageLinkNumber - 1) / 2;
                i < this.currentPage + (this.pageLinkNumber - 1) / 2 + 1;
                i++
            ) {
                pagesDisplayed.push(i);
            }
        }

        this.pagesDisplayed = [...pagesDisplayed];
    }
}
