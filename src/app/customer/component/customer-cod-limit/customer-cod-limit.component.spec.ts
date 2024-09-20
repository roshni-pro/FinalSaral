import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCodLimitComponent } from './customer-cod-limit.component';

describe('CustomerCodLimitComponent', () => {
  let component: CustomerCodLimitComponent;
  let fixture: ComponentFixture<CustomerCodLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCodLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCodLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
