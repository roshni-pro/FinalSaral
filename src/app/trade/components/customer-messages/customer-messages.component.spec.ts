import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMessagesComponent } from './customer-messages.component';

describe('CustomerMessagesComponent', () => {
  let component: CustomerMessagesComponent;
  let fixture: ComponentFixture<CustomerMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
