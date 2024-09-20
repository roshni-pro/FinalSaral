import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSummaryReportComponent } from './trip-summary-report.component';

describe('TripSummaryReportComponent', () => {
  let component: TripSummaryReportComponent;
  let fixture: ComponentFixture<TripSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
