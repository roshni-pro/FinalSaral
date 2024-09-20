import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanOfferRepaymentScheduleComponent } from './loan-offer-repayment-schedule.component';

describe('LoanOfferRepaymentScheduleComponent', () => {
  let component: LoanOfferRepaymentScheduleComponent;
  let fixture: ComponentFixture<LoanOfferRepaymentScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanOfferRepaymentScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanOfferRepaymentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
