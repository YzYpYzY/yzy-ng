import { ScreenTypes } from '../models/ScreenTypes';
import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ResponsiveService {
    private screenTypeSubject$ = new BehaviorSubject<ScreenTypes>(null);
    screenType$ = this.screenTypeSubject$
        .asObservable()
        .pipe(distinctUntilChanged());
    private screenSizeClassSubject$ = new BehaviorSubject<string>(null);
    screenSizeClass$ = this.screenSizeClassSubject$
        .asObservable()
        .pipe(distinctUntilChanged());
    private innerWidth: number;
    private screenBreakPoints: [number, number] = [450, 800];

    private screenClasses = {
        [ScreenTypes.Smartphone]: 's-smartphone',
        [ScreenTypes.Tablet]: 's-tablet',
        [ScreenTypes.Desktop]: 's-desktop'
    };

    constructor() {
        this.innerWidth = window.innerWidth;
        this.computeScreenType();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = event.target.innerWidth;
    }

    setScreenBreakPoints(breakPoints: [number, number]): void {
        this.screenBreakPoints = breakPoints;
        this.computeScreenType();
    }

    computeScreenType(): void {
        let screenType: ScreenTypes;
        if (this.innerWidth < this.screenBreakPoints[0]) {
            screenType = ScreenTypes.Smartphone;
        } else if (this.innerWidth < this.screenBreakPoints[1]) {
            screenType = ScreenTypes.Tablet;
        } else {
            screenType = ScreenTypes.Desktop;
        }
        const sizeClass = this.screenClasses[screenType];

        this.screenTypeSubject$.next(screenType);
        this.screenSizeClassSubject$.next(sizeClass);
    }
}
