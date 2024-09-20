import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualSalesOrdersComponent } from './manual-sales-orders.component';

describe('ManualSalesOrdersComponent', () => {
  let component: ManualSalesOrdersComponent;
  let fixture: ComponentFixture<ManualSalesOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualSalesOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualSalesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
