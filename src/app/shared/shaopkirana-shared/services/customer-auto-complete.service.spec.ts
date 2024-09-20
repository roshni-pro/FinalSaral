import { TestBed } from '@angular/core/testing';

import { CustomerAutoCompleteService } from './customer-auto-complete.service';

describe('CustomerAutoCompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerAutoCompleteService = TestBed.get(CustomerAutoCompleteService);
    expect(service).toBeTruthy();
  });
});
