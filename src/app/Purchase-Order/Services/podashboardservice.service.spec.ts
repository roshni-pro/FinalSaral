import { TestBed } from '@angular/core/testing';

import { PodashboardserviceService } from './podashboardservice.service';

describe('PodashboardserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PodashboardserviceService = TestBed.get(PodashboardserviceService);
    expect(service).toBeTruthy();
  });
});
