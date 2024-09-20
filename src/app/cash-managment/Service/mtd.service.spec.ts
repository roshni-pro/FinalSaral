import { TestBed } from '@angular/core/testing';

import { MtdService } from './mtd.service';

describe('MtdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MtdService = TestBed.get(MtdService);
    expect(service).toBeTruthy();
  });
});
