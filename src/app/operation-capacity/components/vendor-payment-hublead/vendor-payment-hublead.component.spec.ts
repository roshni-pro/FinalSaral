import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaymentHubleadComponent } from './vendor-payment-hublead.component'; 

describe('VendorPaymentHubleadComponent', () => {
  let component: VendorPaymentHubleadComponent;
  let fixture: ComponentFixture<VendorPaymentHubleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPaymentHubleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPaymentHubleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
