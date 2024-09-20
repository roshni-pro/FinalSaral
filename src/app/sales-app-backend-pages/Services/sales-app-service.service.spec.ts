import { TestBed } from '@angular/core/testing';

import { SalesAppServiceService } from './sales-app-service.service';

describe('SalesAppServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesAppServiceService = TestBed.get(SalesAppServiceService);
    expect(service).toBeTruthy();
  });
});
