import { TestBed } from '@angular/core/testing';

import { EtaUpdateOrderService } from './eta-update-order.service';

describe('EtaUpdateOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtaUpdateOrderService = TestBed.get(EtaUpdateOrderService);
    expect(service).toBeTruthy();
  });
});
