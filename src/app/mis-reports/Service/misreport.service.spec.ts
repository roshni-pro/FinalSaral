import { TestBed } from '@angular/core/testing';

import { MisreportService } from './misreport.service';

describe('MisreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MisreportService = TestBed.get(MisreportService);
    expect(service).toBeTruthy();
  });
});
