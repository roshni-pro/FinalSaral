import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRetailerCrossBuyingComponent } from './supplier-retailer-cross-buying.component';

describe('SupplierRetailerCrossBuyingComponent', () => {
  let component: SupplierRetailerCrossBuyingComponent;
  let fixture: ComponentFixture<SupplierRetailerCrossBuyingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierRetailerCrossBuyingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRetailerCrossBuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
