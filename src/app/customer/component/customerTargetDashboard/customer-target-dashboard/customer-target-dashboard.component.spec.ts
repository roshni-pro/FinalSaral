import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTargetDashboardComponent } from './customer-target-dashboard.component';

describe('CustomerTargetDashboardComponent', () => {
  let component: CustomerTargetDashboardComponent;
  let fixture: ComponentFixture<CustomerTargetDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTargetDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTargetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
