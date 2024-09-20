import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaymentSummaryComponent } from './vendor-payment-summary.component';

describe('VendorPaymentSummaryComponent', () => {
  let component: VendorPaymentSummaryComponent;
  let fixture: ComponentFixture<VendorPaymentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPaymentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
