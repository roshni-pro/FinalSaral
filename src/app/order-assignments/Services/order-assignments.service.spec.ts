import { TestBed } from '@angular/core/testing';

import { OrderAssignmentsService } from './order-assignments.service';

describe('OrderAssignmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderAssignmentsService = TestBed.get(OrderAssignmentsService);
    expect(service).toBeTruthy();
  });
});
