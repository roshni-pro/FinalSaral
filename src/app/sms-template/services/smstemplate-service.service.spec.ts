import { TestBed } from '@angular/core/testing';

import { SmstemplateServiceService } from './smstemplate-service.service';

describe('SmstemplateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmstemplateServiceService = TestBed.get(SmstemplateServiceService);
    expect(service).toBeTruthy();
  });
});
