import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualStockSettlementComponent } from './virtual-stock-settlement.component';

describe('VirtualStockSettlementComponent', () => {
  let component: VirtualStockSettlementComponent;
  let fixture: ComponentFixture<VirtualStockSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualStockSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualStockSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
