import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedPRPaymentsComponent } from './closed-prpayments.component';

describe('ClosedPRPaymentsComponent', () => {
  let component: ClosedPRPaymentsComponent;
  let fixture: ComponentFixture<ClosedPRPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedPRPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedPRPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
