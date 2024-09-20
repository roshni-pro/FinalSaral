import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTwoOrderReconciliationStatementDetailsComponent } from './order-two-order-reconciliation-statement-details.component';

describe('OrderTwoOrderReconciliationStatementDetailsComponent', () => {
  let component: OrderTwoOrderReconciliationStatementDetailsComponent;
  let fixture: ComponentFixture<OrderTwoOrderReconciliationStatementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTwoOrderReconciliationStatementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTwoOrderReconciliationStatementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
