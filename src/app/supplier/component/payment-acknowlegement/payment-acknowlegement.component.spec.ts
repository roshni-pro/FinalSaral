import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAcknowlegementComponent } from './payment-acknowlegement.component';

describe('PaymentAcknowlegementComponent', () => {
  let component: PaymentAcknowlegementComponent;
  let fixture: ComponentFixture<PaymentAcknowlegementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAcknowlegementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAcknowlegementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
