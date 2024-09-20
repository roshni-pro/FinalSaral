import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancelRequestComponent } from './order-cancel-request.component';

describe('OrderCancelRequestComponent', () => {
  let component: OrderCancelRequestComponent;
  let fixture: ComponentFixture<OrderCancelRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCancelRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCancelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
