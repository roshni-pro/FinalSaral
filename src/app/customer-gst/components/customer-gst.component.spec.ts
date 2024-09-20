import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGstComponent } from './customer-gst.component';

describe('CustomerGstComponent', () => {
  let component: CustomerGstComponent;
  let fixture: ComponentFixture<CustomerGstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
