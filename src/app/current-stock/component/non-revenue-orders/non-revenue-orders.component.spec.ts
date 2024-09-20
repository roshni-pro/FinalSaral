import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRevenueOrdersComponent } from './non-revenue-orders.component';

describe('NonRevenueOrdersComponent', () => {
  let component: NonRevenueOrdersComponent;
  let fixture: ComponentFixture<NonRevenueOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonRevenueOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRevenueOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
