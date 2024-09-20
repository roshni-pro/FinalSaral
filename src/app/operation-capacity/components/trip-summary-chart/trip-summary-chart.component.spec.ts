import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSummaryChartComponent } from './trip-summary-chart.component';

describe('TripSummaryChartComponent', () => {
  let component: TripSummaryChartComponent;
  let fixture: ComponentFixture<TripSummaryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripSummaryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
