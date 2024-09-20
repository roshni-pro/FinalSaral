import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusSalseReportComponent } from './order-status-salse-report.component';

describe('OrderStatusSalseReportComponent', () => {
  let component: OrderStatusSalseReportComponent;
  let fixture: ComponentFixture<OrderStatusSalseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusSalseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusSalseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
