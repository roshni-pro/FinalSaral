import { TestBed } from '@angular/core/testing';

import { MopService } from './mop.service';

describe('MopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MopService = TestBed.get(MopService);
    expect(service).toBeTruthy();
  });
});
