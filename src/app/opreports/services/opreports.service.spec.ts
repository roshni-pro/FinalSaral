import { TestBed } from '@angular/core/testing';

import { OpreportsService } from './opreports.service';

describe('OpreportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpreportsService = TestBed.get(OpreportsService);
    expect(service).toBeTruthy();
  });
});
