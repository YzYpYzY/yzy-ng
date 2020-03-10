import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponent implements OnDestroy {

    destroy$: Subject<boolean> = new Subject();

    constructor() { }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}
