import { TestBed } from '@angular/core/testing';

import { NewEwayServiceService } from './new-eway-service.service';

describe('NewEwayServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewEwayServiceService = TestBed.get(NewEwayServiceService);
    expect(service).toBeTruthy();
  });
});
