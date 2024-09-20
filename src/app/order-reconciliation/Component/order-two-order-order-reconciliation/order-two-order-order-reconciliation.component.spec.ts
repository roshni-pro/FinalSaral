import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTwoOrderOrderReconciliationComponent } from './order-two-order-order-reconciliation.component';

describe('OrderTwoOrderOrderReconciliationComponent', () => {
  let component: OrderTwoOrderOrderReconciliationComponent;
  let fixture: ComponentFixture<OrderTwoOrderOrderReconciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTwoOrderOrderReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTwoOrderOrderReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
