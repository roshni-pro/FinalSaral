import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLedgerConsentListComponent } from './customer-ledger-consent-list.component';

describe('CustomerLedgerConsentListComponent', () => {
  let component: CustomerLedgerConsentListComponent;
  let fixture: ComponentFixture<CustomerLedgerConsentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLedgerConsentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLedgerConsentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
