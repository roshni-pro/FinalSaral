import { TestBed } from '@angular/core/testing';

import { InternaltransfersService } from './internaltransfers.service';

describe('InternaltransfersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternaltransfersService = TestBed.get(InternaltransfersService);
    expect(service).toBeTruthy();
  });
});
