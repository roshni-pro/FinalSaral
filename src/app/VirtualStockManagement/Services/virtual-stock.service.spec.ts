import { TestBed } from '@angular/core/testing';

import { VirtualStockService } from './virtual-stock.service';

describe('VirtualStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VirtualStockService = TestBed.get(VirtualStockService);
    expect(service).toBeTruthy();
  });
});
