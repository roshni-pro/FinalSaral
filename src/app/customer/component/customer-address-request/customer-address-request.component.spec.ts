import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressRequestComponent } from './customer-address-request.component';

describe('CustomerAddressRequestComponent', () => {
  let component: CustomerAddressRequestComponent;
  let fixture: ComponentFixture<CustomerAddressRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAddressRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddressRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
