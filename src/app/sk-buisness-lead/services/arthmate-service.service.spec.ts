import { TestBed } from '@angular/core/testing';

import { ArthmateServiceService } from './arthmate-service.service';

describe('ArthmateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArthmateServiceService = TestBed.get(ArthmateServiceService);
    expect(service).toBeTruthy();
  });
});
