import { TestBed } from '@angular/core/testing';

import { RedeemMasterService } from './redeem-master.service';

describe('RedeemMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedeemMasterService = TestBed.get(RedeemMasterService);
    expect(service).toBeTruthy();
  });
});
