import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChequelimitComponent } from './customer-chequelimit.component';

describe('CustomerChequelimitComponent', () => {
  let component: CustomerChequelimitComponent;
  let fixture: ComponentFixture<CustomerChequelimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerChequelimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerChequelimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
