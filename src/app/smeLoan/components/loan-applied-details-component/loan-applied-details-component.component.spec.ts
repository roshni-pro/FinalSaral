import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAppliedDetailsComponentComponent } from './loan-applied-details-component.component';

describe('LoanAppliedDetailsComponentComponent', () => {
  let component: LoanAppliedDetailsComponentComponent;
  let fixture: ComponentFixture<LoanAppliedDetailsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAppliedDetailsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAppliedDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
