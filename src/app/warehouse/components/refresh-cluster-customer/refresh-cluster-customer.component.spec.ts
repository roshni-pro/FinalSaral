import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshClusterCustomerComponent } from './refresh-cluster-customer.component';

describe('RefreshClusterCustomerComponent', () => {
  let component: RefreshClusterCustomerComponent;
  let fixture: ComponentFixture<RefreshClusterCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshClusterCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshClusterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
