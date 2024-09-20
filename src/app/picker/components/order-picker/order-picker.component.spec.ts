import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPickerComponent } from './order-picker.component';

describe('OrderPickerComponent', () => {
  let component: OrderPickerComponent;
  let fixture: ComponentFixture<OrderPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
