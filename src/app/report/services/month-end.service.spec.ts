import { TestBed } from '@angular/core/testing';

import { MonthEndService } from './month-end.service';

describe('MonthEndService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonthEndService = TestBed.get(MonthEndService);
    expect(service).toBeTruthy();
  });
});
