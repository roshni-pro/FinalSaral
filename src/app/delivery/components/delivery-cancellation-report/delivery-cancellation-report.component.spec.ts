import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCancellationReportComponent } from './delivery-cancellation-report.component';

describe('DeliveryCancellationReportComponent', () => {
  let component: DeliveryCancellationReportComponent;
  let fixture: ComponentFixture<DeliveryCancellationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCancellationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCancellationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
