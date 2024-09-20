import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDeatilsComponent } from './payment-deatils.component';

describe('PaymentDeatilsComponent', () => {
  let component: PaymentDeatilsComponent;
  let fixture: ComponentFixture<PaymentDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
