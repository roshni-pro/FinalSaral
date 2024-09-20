import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerShoppingCartComponent } from './customer-shopping-cart.component';

describe('CustomerShoppingCartComponent', () => {
  let component: CustomerShoppingCartComponent;
  let fixture: ComponentFixture<CustomerShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
