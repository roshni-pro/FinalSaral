import { TestBed } from '@angular/core/testing';

import { DispatchToSpendTrackerService } from './dispatch-to-spend-tracker.service';

describe('DispatchToSpendTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispatchToSpendTrackerService = TestBed.get(DispatchToSpendTrackerService);
    expect(service).toBeTruthy();
  });
});
