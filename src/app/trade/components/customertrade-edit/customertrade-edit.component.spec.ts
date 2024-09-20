import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTradeEditComponent } from './customertrade-edit.component';

describe('CustomerEditComponent', () => {
  let component: CustomerTradeEditComponent;
  let fixture: ComponentFixture<CustomerTradeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTradeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTradeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
