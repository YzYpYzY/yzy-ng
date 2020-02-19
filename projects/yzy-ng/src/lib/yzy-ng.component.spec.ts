import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YzyNgComponent } from './yzy-ng.component';

describe('YzyNgComponent', () => {
  let component: YzyNgComponent;
  let fixture: ComponentFixture<YzyNgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YzyNgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YzyNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
