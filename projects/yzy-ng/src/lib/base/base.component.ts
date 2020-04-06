import { OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export class BaseComponent implements OnDestroy {
    private destroy_sub$: Subject<boolean> = new Subject();
    destroy$: Observable<boolean> = this.destroy_sub$.asObservable();

    constructor() {}

    ngOnDestroy(): void {
        this.destroy_sub$.next(true);
        this.destroy_sub$.unsubscribe();
    }
}
