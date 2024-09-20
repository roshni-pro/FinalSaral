import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseQuadrantCustomerTypeComponent } from './warehouse-quadrant-customer-type.component';

describe('WarehouseQuadrantCustomerTypeComponent', () => {
  let component: WarehouseQuadrantCustomerTypeComponent;
  let fixture: ComponentFixture<WarehouseQuadrantCustomerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseQuadrantCustomerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseQuadrantCustomerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
