import { TestBed } from '@angular/core/testing';

import { AttendanceRulesService } from './attendance-rules.service';

describe('AttendanceRulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendanceRulesService = TestBed.get(AttendanceRulesService);
    expect(service).toBeTruthy();
  });
});
