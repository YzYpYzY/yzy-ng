import { Subject } from 'rxjs';
import {
    Injectable,
    Injector,
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef
} from '@angular/core';
import { CalendarState } from './models/CalendarState';
import { DateSelectorCalendarComponent } from './date-selector-calendar/date-selector-calendar.component';
import { DisplayDate } from './models/DisplayDate';

@Injectable({ providedIn: 'root' })
export class DateSelectorService {
    calendarState$ = new Subject<CalendarState>();
    private lastId = 0;
    private calendarReferences: {
        [key: number]: ComponentRef<DateSelectorCalendarComponent>;
    } = {};

    constructor(
        private appRef: ApplicationRef,
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    displayCalendar(
        date: DisplayDate,
        bottomLeftPosition: { x: number; y: number },
        width: number
    ): number {
        const id = ++this.lastId;
        setTimeout(() => {
            this.createCalendarComponent(id, date, bottomLeftPosition, width);
            this.calendarState$.next({
                id,
                date: null,
                isOpen: true
            });
        });
        return id;
    }

    newValue(id, date): void {
        this.calendarState$.next({ id, date, isOpen: true });
    }

    close(id: number, date: DisplayDate = null): void {
        this.calendarState$.next({ id, date, isOpen: false });
        this.destroyCalendarsComponent(id);
    }

    private createCalendarComponent(
        id: number,
        date: DisplayDate,
        bottomLeftPosition: { x: number; y: number },
        width: number
    ): void {
        const calendarsRef = this.componentFactoryResolver
            .resolveComponentFactory(DateSelectorCalendarComponent)
            .create(this.injector);
        calendarsRef.instance.id = id;
        calendarsRef.instance.date = date;
        calendarsRef.instance.calendarService = this;
        calendarsRef.instance.x = bottomLeftPosition.x - 1;
        calendarsRef.instance.y = bottomLeftPosition.y - 1;
        calendarsRef.instance.minWidth = width + 2;
        this.appRef.attachView(calendarsRef.hostView);

        const domElem = (calendarsRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);
        this.calendarReferences[id] = calendarsRef;
    }

    private destroyCalendarsComponent(id: number): void {
        if (this.calendarReferences[id] !== undefined) {
            this.appRef.detachView(this.calendarReferences[id].hostView);
            this.calendarReferences[id].destroy();
            this.calendarReferences[id] = undefined;
        }
    }
}
