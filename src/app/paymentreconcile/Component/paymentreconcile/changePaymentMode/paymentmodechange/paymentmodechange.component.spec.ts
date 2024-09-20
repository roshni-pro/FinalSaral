import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmodechangeComponent } from './paymentmodechange.component';

describe('PaymentmodechangeComponent', () => {
  let component: PaymentmodechangeComponent;
  let fixture: ComponentFixture<PaymentmodechangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentmodechangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentmodechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
