import { TestBed } from '@angular/core/testing';

import { ExecutivelistbywareidService } from './executivelistbywareid.service';

describe('ExecutivelistbywareidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutivelistbywareidService = TestBed.get(ExecutivelistbywareidService);
    expect(service).toBeTruthy();
  });
});
