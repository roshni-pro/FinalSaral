import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualSalesOrderComponent } from './add-manual-sales-order.component';

describe('AddManualSalesOrderComponent', () => {
  let component: AddManualSalesOrderComponent;
  let fixture: ComponentFixture<AddManualSalesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManualSalesOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManualSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
