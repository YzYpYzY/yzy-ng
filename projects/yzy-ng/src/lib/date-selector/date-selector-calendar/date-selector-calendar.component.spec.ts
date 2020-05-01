import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSelectorCalendarComponent } from './date-selector-calendar.component';

describe('DateSelectorCalendarComponent', () => {
  let component: DateSelectorCalendarComponent;
  let fixture: ComponentFixture<DateSelectorCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateSelectorCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectorCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
