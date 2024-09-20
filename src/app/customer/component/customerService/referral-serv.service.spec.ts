import { TestBed } from '@angular/core/testing';

import { ReferralServService } from './referral-serv.service';

describe('ReferralServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferralServService = TestBed.get(ReferralServService);
    expect(service).toBeTruthy();
  });
});
