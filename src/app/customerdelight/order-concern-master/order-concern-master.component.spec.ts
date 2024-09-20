import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConcernMasterComponent } from './order-concern-master.component';

describe('OrderConcernMasterComponent', () => {
  let component: OrderConcernMasterComponent;
  let fixture: ComponentFixture<OrderConcernMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderConcernMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConcernMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
