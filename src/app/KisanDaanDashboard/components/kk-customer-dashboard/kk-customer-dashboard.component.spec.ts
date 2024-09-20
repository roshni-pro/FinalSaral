import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkCustomerDashboardComponent } from './kk-customer-dashboard.component';

describe('KkCustomerDashboardComponent', () => {
  let component: KkCustomerDashboardComponent;
  let fixture: ComponentFixture<KkCustomerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkCustomerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkCustomerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
