import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPaymentSettlementListComponent } from './agent-payment-settlement-list.component';

describe('AgentPaymentSettlementListComponent', () => {
  let component: AgentPaymentSettlementListComponent;
  let fixture: ComponentFixture<AgentPaymentSettlementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPaymentSettlementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPaymentSettlementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
