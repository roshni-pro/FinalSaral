import { TestBed } from '@angular/core/testing';

import { CashMgmtServicesService } from './cash-mgmt-services.service';

describe('CashMgmtServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashMgmtServicesService = TestBed.get(CashMgmtServicesService);
    expect(service).toBeTruthy();
  });
});
