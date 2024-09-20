import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaymentAutomationComponent } from './vendor-payment-automation.component';

describe('VendorPaymentAutomationComponent', () => {
  let component: VendorPaymentAutomationComponent;
  let fixture: ComponentFixture<VendorPaymentAutomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPaymentAutomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPaymentAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
