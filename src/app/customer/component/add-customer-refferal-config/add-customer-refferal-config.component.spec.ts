import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerRefferalConfigComponent } from './add-customer-refferal-config.component';

describe('AddCustomerRefferalConfigComponent', () => {
  let component: AddCustomerRefferalConfigComponent;
  let fixture: ComponentFixture<AddCustomerRefferalConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerRefferalConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerRefferalConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
