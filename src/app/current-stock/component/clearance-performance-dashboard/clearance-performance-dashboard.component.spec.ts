import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearancePerformanceDashboardComponent } from './clearance-performance-dashboard.component';

describe('ClearancePerformanceDashboardComponent', () => {
  let component: ClearancePerformanceDashboardComponent;
  let fixture: ComponentFixture<ClearancePerformanceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearancePerformanceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearancePerformanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
