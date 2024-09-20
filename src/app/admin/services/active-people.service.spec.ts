import { TestBed } from '@angular/core/testing';

import { ActivePeopleService } from './active-people.service';

describe('ActivePeopleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivePeopleService = TestBed.get(ActivePeopleService);
    expect(service).toBeTruthy();
  });
});
