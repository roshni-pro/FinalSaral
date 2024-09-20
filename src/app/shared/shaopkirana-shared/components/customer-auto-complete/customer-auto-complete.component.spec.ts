import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAutoCompleteComponent } from './customer-auto-complete.component';

describe('CustomerAutoCompleteComponent', () => {
  let component: CustomerAutoCompleteComponent;
  let fixture: ComponentFixture<CustomerAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
