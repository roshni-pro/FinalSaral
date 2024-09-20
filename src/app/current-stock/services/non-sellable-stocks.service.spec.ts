import { TestBed } from '@angular/core/testing';

import { NonSellableStocksService } from './non-sellable-stocks.service';

describe('NonSellableStocksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NonSellableStocksService = TestBed.get(NonSellableStocksService);
    expect(service).toBeTruthy();
  });
});
