import { TestBed } from '@angular/core/testing';

import { AgentpaymentsettlementService } from './agentpaymentsettlement.service';

describe('AgentpaymentsettlementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentpaymentsettlementService = TestBed.get(AgentpaymentsettlementService);
    expect(service).toBeTruthy();
  });
});
