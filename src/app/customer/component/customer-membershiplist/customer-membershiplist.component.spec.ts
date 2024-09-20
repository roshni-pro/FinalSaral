import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMembershiplistComponent } from './customer-membershiplist.component';

describe('CustomerMembershiplistComponent', () => {
  let component: CustomerMembershiplistComponent;
  let fixture: ComponentFixture<CustomerMembershiplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMembershiplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMembershiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
