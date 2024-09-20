import { TestBed } from '@angular/core/testing';

import { InventoryforcastserService } from './inventoryforcastser.service';

describe('InventoryforcastserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryforcastserService = TestBed.get(InventoryforcastserService);
    expect(service).toBeTruthy();
  });
});
