import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTrendsComponent } from './customer-trends.component';

describe('CustomerTrendsComponent', () => {
  let component: CustomerTrendsComponent;
  let fixture: ComponentFixture<CustomerTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
