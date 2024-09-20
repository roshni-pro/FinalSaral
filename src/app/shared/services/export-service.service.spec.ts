import { TestBed } from '@angular/core/testing';

import { ExportServiceService } from './export-service.service';

describe('ExportServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportServiceService = TestBed.get(ExportServiceService);
    expect(service).toBeTruthy();
  });
});
