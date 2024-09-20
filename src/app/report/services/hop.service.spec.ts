import { TestBed } from '@angular/core/testing';

import { HopService } from './hop.service';

describe('HopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HopService = TestBed.get(HopService);
    expect(service).toBeTruthy();
  });
});
