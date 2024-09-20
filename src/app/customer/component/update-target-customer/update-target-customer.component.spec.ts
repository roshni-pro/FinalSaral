import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTargetCustomerComponent } from './update-target-customer.component';

describe('UpdateTargetCustomerComponent', () => {
  let component: UpdateTargetCustomerComponent;
  let fixture: ComponentFixture<UpdateTargetCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTargetCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTargetCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
