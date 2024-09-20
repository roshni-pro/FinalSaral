import { TestBed } from '@angular/core/testing';

import { RocServiceService } from './roc-service.service';

describe('RocServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RocServiceService = TestBed.get(RocServiceService);
    expect(service).toBeTruthy();
  });
});
