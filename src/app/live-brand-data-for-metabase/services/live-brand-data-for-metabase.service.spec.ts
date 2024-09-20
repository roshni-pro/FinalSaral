import { TestBed } from '@angular/core/testing';

import { LiveBrandDataForMetabaseService } from './live-brand-data-for-metabase.service';

describe('LiveBrandDataForMetabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveBrandDataForMetabaseService = TestBed.get(LiveBrandDataForMetabaseService);
    expect(service).toBeTruthy();
  });
});
