import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtdSalesReportComponent } from './mtd-sales-report.component';

describe('MtdSalesReportComponent', () => {
  let component: MtdSalesReportComponent;
  let fixture: ComponentFixture<MtdSalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdSalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtdSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
