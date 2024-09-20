import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettleComponent } from './order-settle.component';

describe('OrderSettleComponent', () => {
  let component: OrderSettleComponent;
  let fixture: ComponentFixture<OrderSettleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSettleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSettleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
