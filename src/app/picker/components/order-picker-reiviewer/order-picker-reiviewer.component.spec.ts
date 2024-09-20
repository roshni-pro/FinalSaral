import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPickerReiviewerComponent } from './order-picker-reiviewer.component';

describe('OrderPickerReiviewerComponent', () => {
  let component: OrderPickerReiviewerComponent;
  let fixture: ComponentFixture<OrderPickerReiviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPickerReiviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPickerReiviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
