import { TestBed } from '@angular/core/testing';

import { WarehousematerialsserviceService } from './warehousematerialsservice.service';

describe('WarehousematerialsserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarehousematerialsserviceService = TestBed.get(WarehousematerialsserviceService);
    expect(service).toBeTruthy();
  });
});
