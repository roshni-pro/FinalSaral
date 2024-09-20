import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCustomerRequestComponent } from './approve-customer-request.component';

describe('ApproveCustomerRequestComponent', () => {
  let component: ApproveCustomerRequestComponent;
  let fixture: ComponentFixture<ApproveCustomerRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCustomerRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCustomerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
