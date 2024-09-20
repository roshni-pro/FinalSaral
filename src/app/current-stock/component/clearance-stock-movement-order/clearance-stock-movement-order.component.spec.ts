import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceStockMovementOrderComponent } from './clearance-stock-movement-order.component';

describe('ClearanceStockMovementOrderComponent', () => {
  let component: ClearanceStockMovementOrderComponent;
  let fixture: ComponentFixture<ClearanceStockMovementOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceStockMovementOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceStockMovementOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
