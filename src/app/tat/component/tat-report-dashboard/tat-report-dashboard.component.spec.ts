import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TatReportDashboardComponent } from './tat-report-dashboard.component';

describe('TatReportDashboardComponent', () => {
  let component: TatReportDashboardComponent;
  let fixture: ComponentFixture<TatReportDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TatReportDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TatReportDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
