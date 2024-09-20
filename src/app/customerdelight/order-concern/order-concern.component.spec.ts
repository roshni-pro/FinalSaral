import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConcernComponent } from './order-concern.component';

describe('OrderConcernComponent', () => {
  let component: OrderConcernComponent;
  let fixture: ComponentFixture<OrderConcernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderConcernComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
