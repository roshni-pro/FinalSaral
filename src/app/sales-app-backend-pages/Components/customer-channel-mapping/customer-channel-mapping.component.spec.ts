import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChannelMappingComponent } from './customer-channel-mapping.component';

describe('CustomerChannelMappingComponent', () => {
  let component: CustomerChannelMappingComponent;
  let fixture: ComponentFixture<CustomerChannelMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerChannelMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerChannelMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
