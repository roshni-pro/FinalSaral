import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutBoundDashboardComponent } from './out-bound-dashboard.component';

describe('OutBoundDashboardComponent', () => {
  let component: OutBoundDashboardComponent;
  let fixture: ComponentFixture<OutBoundDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutBoundDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutBoundDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
