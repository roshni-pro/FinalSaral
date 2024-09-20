import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentPerformanceDashboardComponent } from './indent-performance-dashboard.component';

describe('IndentPerformanceDashboardComponent', () => {
  let component: IndentPerformanceDashboardComponent;
  let fixture: ComponentFixture<IndentPerformanceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentPerformanceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentPerformanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
