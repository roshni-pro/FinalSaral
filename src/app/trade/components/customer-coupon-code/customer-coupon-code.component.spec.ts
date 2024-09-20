import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCouponCodeComponent } from './customer-coupon-code.component';

describe('CustomerCouponCodeComponent', () => {
  let component: CustomerCouponCodeComponent;
  let fixture: ComponentFixture<CustomerCouponCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCouponCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCouponCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
