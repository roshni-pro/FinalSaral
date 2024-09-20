import { TestBed } from '@angular/core/testing';

import { PosSystemService } from './pos-system.service';

describe('PosSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosSystemService = TestBed.get(PosSystemService);
    expect(service).toBeTruthy();
  });
});
