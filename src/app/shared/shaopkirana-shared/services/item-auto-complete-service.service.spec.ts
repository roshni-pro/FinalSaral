import { TestBed } from '@angular/core/testing';

import { ItemAutoCompleteServiceService } from './item-auto-complete-service.service';

describe('ItemAutoCompleteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemAutoCompleteServiceService = TestBed.get(ItemAutoCompleteServiceService);
    expect(service).toBeTruthy();
  });
});
