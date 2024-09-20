import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailListComponent } from './customer-detail-list.component';

describe('CustomerDetailListComponent', () => {
  let component: CustomerDetailListComponent;
  let fixture: ComponentFixture<CustomerDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
