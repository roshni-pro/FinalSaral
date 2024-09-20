import { TestBed } from '@angular/core/testing';

import { PendingOrderService } from './pending-order.service';

describe('PendingOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingOrderService = TestBed.get(PendingOrderService);
    expect(service).toBeTruthy();
  });
});
