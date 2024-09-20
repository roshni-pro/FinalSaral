import { TestBed } from '@angular/core/testing';

import { ClearanceOrderPickerListService } from './clearance-order-picker-list.service';

describe('ClearanceOrderPickerListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearanceOrderPickerListService = TestBed.get(ClearanceOrderPickerListService);
    expect(service).toBeTruthy();
  });
});
