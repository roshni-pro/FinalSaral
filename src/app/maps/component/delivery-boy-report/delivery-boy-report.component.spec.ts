import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyReportComponent } from './delivery-boy-report.component';

describe('DeliveryBoyReportComponent', () => {
  let component: DeliveryBoyReportComponent;
  let fixture: ComponentFixture<DeliveryBoyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
