import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressRequestPartialComponent } from './customer-address-request-partial.component';

describe('CustomerAddressRequestPartialComponent', () => {
  let component: CustomerAddressRequestPartialComponent;
  let fixture: ComponentFixture<CustomerAddressRequestPartialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAddressRequestPartialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddressRequestPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
