import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPerformanceDashboardComponent } from './sales-performance-dashboard.component';

describe('SalesPerformanceDashboardComponent', () => {
  let component: SalesPerformanceDashboardComponent;
  let fixture: ComponentFixture<SalesPerformanceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPerformanceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPerformanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
