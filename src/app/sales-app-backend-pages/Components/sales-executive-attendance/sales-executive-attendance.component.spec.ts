import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesExecutiveAttendanceComponent } from './sales-executive-attendance.component';

describe('SalesExecutiveAttendanceComponent', () => {
  let component: SalesExecutiveAttendanceComponent;
  let fixture: ComponentFixture<SalesExecutiveAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesExecutiveAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesExecutiveAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
