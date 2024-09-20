import { TestBed } from '@angular/core/testing';

import { CouponcodesService } from './couponcodes.service';

describe('CouponcodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouponcodesService = TestBed.get(CouponcodesService);
    expect(service).toBeTruthy();
  });
});
