import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLocationVerificationComponent } from './customer-location-verification.component';

describe('CustomerLocationVerificationComponent', () => {
  let component: CustomerLocationVerificationComponent;
  let fixture: ComponentFixture<CustomerLocationVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLocationVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLocationVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
