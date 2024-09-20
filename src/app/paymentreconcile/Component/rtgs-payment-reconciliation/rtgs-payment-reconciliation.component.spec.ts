import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RTGSPaymentReconciliationComponent } from './rtgs-payment-reconciliation.component';

describe('RTGSPaymentReconciliationComponent', () => {
  let component: RTGSPaymentReconciliationComponent;
  let fixture: ComponentFixture<RTGSPaymentReconciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RTGSPaymentReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RTGSPaymentReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
