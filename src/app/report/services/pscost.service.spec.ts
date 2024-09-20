import { TestBed } from '@angular/core/testing';

import { PscostService } from './pscost.service';

describe('PscostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PscostService = TestBed.get(PscostService);
    expect(service).toBeTruthy();
  });
});
