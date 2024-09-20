import { TestBed } from '@angular/core/testing';

import { DirectOpenNetworkPincodeService } from './direct-open-network-pincode.service';

describe('DirectOpenNetworkPincodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectOpenNetworkPincodeService = TestBed.get(DirectOpenNetworkPincodeService);
    expect(service).toBeTruthy();
  });
});
