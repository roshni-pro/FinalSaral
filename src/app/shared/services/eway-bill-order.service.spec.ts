import { TestBed } from '@angular/core/testing';

import { EwayBillOrderService } from './eway-bill-order.service';

describe('EwayBillOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EwayBillOrderService = TestBed.get(EwayBillOrderService);
    expect(service).toBeTruthy();
  });
});
