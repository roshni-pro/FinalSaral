import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRetentionConfigurationComponent } from './customer-retention-configuration.component';

describe('CustomerRetentionConfigurationComponent', () => {
  let component: CustomerRetentionConfigurationComponent;
  let fixture: ComponentFixture<CustomerRetentionConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRetentionConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRetentionConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
