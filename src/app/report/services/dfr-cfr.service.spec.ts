import { TestBed } from '@angular/core/testing';

import { DfrCfrService } from './dfr-cfr.service';

describe('DfrCfrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DfrCfrService = TestBed.get(DfrCfrService);
    expect(service).toBeTruthy();
  });
});
