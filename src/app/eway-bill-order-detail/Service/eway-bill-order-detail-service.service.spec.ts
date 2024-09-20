import { TestBed } from '@angular/core/testing';

import { EwayBillOrderDetailServiceService } from './eway-bill-order-detail-service.service';

describe('EwayBillOrderDetailServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EwayBillOrderDetailServiceService = TestBed.get(EwayBillOrderDetailServiceService);
    expect(service).toBeTruthy();
  });
});
