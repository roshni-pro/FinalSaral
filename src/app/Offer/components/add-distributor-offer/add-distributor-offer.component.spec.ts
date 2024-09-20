import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistributorOfferComponent } from './add-distributor-offer.component';

describe('AddDistributorOfferComponent', () => {
  let component: AddDistributorOfferComponent;
  let fixture: ComponentFixture<AddDistributorOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDistributorOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDistributorOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
