import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferClearanceStockToClearanceLiveItemsComponent } from './transfer-clearance-stock-to-clearance-live-items.component';

describe('TransferClearanceStockToClearanceLiveItemsComponent', () => {
  let component: TransferClearanceStockToClearanceLiveItemsComponent;
  let fixture: ComponentFixture<TransferClearanceStockToClearanceLiveItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferClearanceStockToClearanceLiveItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferClearanceStockToClearanceLiveItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
