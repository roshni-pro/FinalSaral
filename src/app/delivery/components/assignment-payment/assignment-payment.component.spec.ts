import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentPaymentComponent } from './assignment-payment.component';

describe('AssignmentPaymentComponent', () => {
  let component: AssignmentPaymentComponent;
  let fixture: ComponentFixture<AssignmentPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
