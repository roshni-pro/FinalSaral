import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualStockAutoSettleComponent } from './virtual-stock-auto-settle.component';

describe('VirtualStockAutoSettleComponent', () => {
  let component: VirtualStockAutoSettleComponent;
  let fixture: ComponentFixture<VirtualStockAutoSettleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualStockAutoSettleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualStockAutoSettleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
