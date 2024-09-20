import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreconcileComponent } from './paymentreconcile.component';

describe('PaymentreconcileComponent', () => {
  let component: PaymentreconcileComponent;
  let fixture: ComponentFixture<PaymentreconcileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentreconcileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreconcileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
