import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressAuditComponent } from './customer-address-audit.component';

describe('CustomerAddressAuditComponent', () => {
  let component: CustomerAddressAuditComponent;
  let fixture: ComponentFixture<CustomerAddressAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAddressAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddressAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
