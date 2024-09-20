import { TestBed } from '@angular/core/testing';

import { ClearanceNonChangeRequestService } from './clearance-non-change-request.service';

describe('ClearanceNonChangeRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearanceNonChangeRequestService = TestBed.get(ClearanceNonChangeRequestService);
    expect(service).toBeTruthy();
  });
});
