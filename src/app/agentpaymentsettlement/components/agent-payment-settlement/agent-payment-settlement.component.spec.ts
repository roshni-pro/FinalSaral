import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPaymentSettlementComponent } from './agent-payment-settlement.component';

describe('AgentPaymentSettlementComponent', () => {
  let component: AgentPaymentSettlementComponent;
  let fixture: ComponentFixture<AgentPaymentSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPaymentSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPaymentSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
