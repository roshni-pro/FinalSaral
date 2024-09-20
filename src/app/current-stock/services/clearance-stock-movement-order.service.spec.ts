import { TestBed } from '@angular/core/testing';

import { ClearanceStockMovementOrderService } from './clearance-stock-movement-order.service';

describe('ClearanceStockMovementOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearanceStockMovementOrderService = TestBed.get(ClearanceStockMovementOrderService);
    expect(service).toBeTruthy();
  });
});
