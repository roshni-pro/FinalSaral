import { TestBed } from '@angular/core/testing';

import { LedgerCorrectionService } from './ledger-correction.service';

describe('LedgerCorrectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LedgerCorrectionService = TestBed.get(LedgerCorrectionService);
    expect(service).toBeTruthy();
  });
});
