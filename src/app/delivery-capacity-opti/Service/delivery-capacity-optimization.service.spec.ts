import { TestBed } from '@angular/core/testing';

import { DeliveryCapacityOptimizationService } from './delivery-capacity-optimization.service';

describe('DeliveryCapacityOptimizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryCapacityOptimizationService = TestBed.get(DeliveryCapacityOptimizationService);
    expect(service).toBeTruthy();
  });
});
