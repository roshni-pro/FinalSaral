import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthEndDataComponent } from './month-end-data.component';

describe('MonthEndDataComponent', () => {
  let component: MonthEndDataComponent;
  let fixture: ComponentFixture<MonthEndDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthEndDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthEndDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
