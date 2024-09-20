import { TestBed } from '@angular/core/testing';

import { OrderReconciliationServiceService } from './order-reconciliation-service.service';

describe('OrderReconciliationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderReconciliationServiceService = TestBed.get(OrderReconciliationServiceService);
    expect(service).toBeTruthy();
  });
});
