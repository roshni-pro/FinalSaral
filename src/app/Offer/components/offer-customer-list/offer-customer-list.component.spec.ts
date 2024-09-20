import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCustomerListComponent } from './offer-customer-list.component';

describe('OfferCustomerListComponent', () => {
  let component: OfferCustomerListComponent;
  let fixture: ComponentFixture<OfferCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
