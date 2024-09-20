import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTwoOrderRecocillationMisComponent } from './order-two-order-recocillation-mis.component';

describe('OrderTwoOrderRecocillationMisComponent', () => {
  let component: OrderTwoOrderRecocillationMisComponent;
  let fixture: ComponentFixture<OrderTwoOrderRecocillationMisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTwoOrderRecocillationMisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTwoOrderRecocillationMisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
