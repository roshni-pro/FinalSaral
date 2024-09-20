import { TestBed } from '@angular/core/testing';

import { RefundPaymentService } from './refund-payment.service';

describe('RefundPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefundPaymentService = TestBed.get(RefundPaymentService);
    expect(service).toBeTruthy();
  });
});
