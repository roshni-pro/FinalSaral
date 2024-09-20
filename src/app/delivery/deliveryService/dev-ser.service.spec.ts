import { TestBed } from '@angular/core/testing';

import { DevSerService } from './dev-ser.service';

describe('DevSerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevSerService = TestBed.get(DevSerService);
    expect(service).toBeTruthy();
  });
});
