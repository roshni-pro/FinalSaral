import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfigurationComponent } from './order-configuration.component';

describe('OrderConfigurationComponent', () => {
  let component: OrderConfigurationComponent;
  let fixture: ComponentFixture<OrderConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
