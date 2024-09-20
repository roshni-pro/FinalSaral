import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLedgerConsentComponent } from './customer-ledger-consent.component';

describe('CustomerLedgerConsentComponent', () => {
  let component: CustomerLedgerConsentComponent;
  let fixture: ComponentFixture<CustomerLedgerConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLedgerConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLedgerConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
