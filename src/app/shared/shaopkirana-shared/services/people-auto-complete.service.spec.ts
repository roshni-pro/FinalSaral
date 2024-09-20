import { TestBed } from '@angular/core/testing';

import { PeopleAutoCompleteService } from './people-auto-complete.service';

describe('PeopleAutoCompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeopleAutoCompleteService = TestBed.get(PeopleAutoCompleteService);
    expect(service).toBeTruthy();
  });
});
