import { TestBed } from '@angular/core/testing';

import { AgentCommissionPaymentService } from './agent-commission-payment.service';

describe('AgentCommissionPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentCommissionPaymentService = TestBed.get(AgentCommissionPaymentService);
    expect(service).toBeTruthy();
  });
});
