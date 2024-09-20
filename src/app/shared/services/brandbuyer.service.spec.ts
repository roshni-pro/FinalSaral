import { TestBed } from '@angular/core/testing';

import { BrandbuyerService } from './brandbuyer.service';

describe('BrandbuyerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrandbuyerService = TestBed.get(BrandbuyerService);
    expect(service).toBeTruthy();
  });
});
