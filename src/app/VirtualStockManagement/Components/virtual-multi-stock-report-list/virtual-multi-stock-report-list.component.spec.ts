import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualMultiStockReportListComponent } from './virtual-multi-stock-report-list.component';

describe('VirtualMultiStockReportListComponent', () => {
  let component: VirtualMultiStockReportListComponent;
  let fixture: ComponentFixture<VirtualMultiStockReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualMultiStockReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualMultiStockReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
