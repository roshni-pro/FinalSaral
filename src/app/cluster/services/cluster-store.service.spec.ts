import { TestBed } from '@angular/core/testing';

import { ClusterStoreService } from './cluster-store.service';

describe('ClusterStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClusterStoreService = TestBed.get(ClusterStoreService);
    expect(service).toBeTruthy();
  });
});
