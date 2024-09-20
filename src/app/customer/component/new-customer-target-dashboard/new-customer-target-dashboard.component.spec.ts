import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerTargetDashboardComponent } from './new-customer-target-dashboard.component';

describe('NewCustomerTargetDashboardComponent', () => {
  let component: NewCustomerTargetDashboardComponent;
  let fixture: ComponentFixture<NewCustomerTargetDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomerTargetDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerTargetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
