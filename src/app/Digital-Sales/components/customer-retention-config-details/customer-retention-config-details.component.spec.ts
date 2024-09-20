import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRetentionConfigDetailsComponent } from './customer-retention-config-details.component';

describe('CustomerRetentionConfigDetailsComponent', () => {
  let component: CustomerRetentionConfigDetailsComponent;
  let fixture: ComponentFixture<CustomerRetentionConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRetentionConfigDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRetentionConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
