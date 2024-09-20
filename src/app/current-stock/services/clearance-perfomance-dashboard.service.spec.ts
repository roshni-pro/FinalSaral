import { TestBed } from '@angular/core/testing';

import { ClearancePerfomanceDashboardService } from './clearance-perfomance-dashboard.service';

describe('ClearancePerfomanceDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearancePerfomanceDashboardService = TestBed.get(ClearancePerfomanceDashboardService);
    expect(service).toBeTruthy();
  });
});
