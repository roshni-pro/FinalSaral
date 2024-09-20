import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPerformanceDashboardComponent } from './product-performance-dashboard.component';

describe('ProductPerformanceDashboardComponent', () => {
  let component: ProductPerformanceDashboardComponent;
  let fixture: ComponentFixture<ProductPerformanceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPerformanceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPerformanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
