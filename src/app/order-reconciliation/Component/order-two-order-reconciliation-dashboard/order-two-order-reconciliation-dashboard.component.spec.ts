import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTwoOrderReconciliationDashboardComponent } from './order-two-order-reconciliation-dashboard.component';

describe('OrderTwoOrderReconciliationDashboardComponent', () => {
  let component: OrderTwoOrderReconciliationDashboardComponent;
  let fixture: ComponentFixture<OrderTwoOrderReconciliationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTwoOrderReconciliationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTwoOrderReconciliationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
