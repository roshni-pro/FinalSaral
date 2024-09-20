import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReferralComponent } from './customer-referral.component';

describe('CustomerReferralComponent', () => {
  let component: CustomerReferralComponent;
  let fixture: ComponentFixture<CustomerReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
