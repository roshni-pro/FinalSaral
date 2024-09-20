import { TestBed } from '@angular/core/testing';

import { AutoOfferConfigService } from './auto-offer-config.service';

describe('AutoOfferConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoOfferConfigService = TestBed.get(AutoOfferConfigService);
    expect(service).toBeTruthy();
  });
});
