import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRatingComponent } from './customer-rating.component';

describe('CustomerRatingComponent', () => {
  let component: CustomerRatingComponent;
  let fixture: ComponentFixture<CustomerRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
