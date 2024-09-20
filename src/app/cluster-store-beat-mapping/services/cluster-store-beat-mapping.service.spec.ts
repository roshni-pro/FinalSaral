import { TestBed } from '@angular/core/testing';

import { ClusterStoreBeatMappingService } from './cluster-store-beat-mapping.service';

describe('ClusterStoreBeatMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClusterStoreBeatMappingService = TestBed.get(ClusterStoreBeatMappingService);
    expect(service).toBeTruthy();
  });
});
