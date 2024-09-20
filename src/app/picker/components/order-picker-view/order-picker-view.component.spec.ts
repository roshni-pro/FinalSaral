import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPickerViewComponent } from './order-picker-view.component';

describe('OrderPickerViewComponent', () => {
  let component: OrderPickerViewComponent;
  let fixture: ComponentFixture<OrderPickerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPickerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPickerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
