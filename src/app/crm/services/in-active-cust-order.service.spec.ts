import { TestBed } from '@angular/core/testing';

import { InActiveCustOrderService } from './in-active-cust-order.service';

describe('InActiveCustOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InActiveCustOrderService = TestBed.get(InActiveCustOrderService);
    expect(service).toBeTruthy();
  });
});
