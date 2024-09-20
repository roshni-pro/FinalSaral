import { TestBed } from '@angular/core/testing';

import { IrpaymentsService } from './irpayments.service';

describe('IrpaymentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IrpaymentsService = TestBed.get(IrpaymentsService);
    expect(service).toBeTruthy();
  });
});
