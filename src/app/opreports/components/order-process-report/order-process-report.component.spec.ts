import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessReportComponent } from './order-process-report.component';

describe('OrderProcessReportComponent', () => {
  let component: OrderProcessReportComponent;
  let fixture: ComponentFixture<OrderProcessReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProcessReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProcessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
