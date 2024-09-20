import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderCloseApprovalComponent } from './purchase-order-close-approval.component';

describe('PurchaseOrderCloseApprovalComponent', () => {
  let component: PurchaseOrderCloseApprovalComponent;
  let fixture: ComponentFixture<PurchaseOrderCloseApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderCloseApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderCloseApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
