import { TestBed } from '@angular/core/testing';

import { ClearanceNonSellableService } from './clearance-non-sellable.service';

describe('ClearanceNonSellableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearanceNonSellableService = TestBed.get(ClearanceNonSellableService);
    expect(service).toBeTruthy();
  });
});
