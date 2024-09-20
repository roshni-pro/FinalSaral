import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderAssignmentChangeComponent } from './delivery-order-assignment-change.component';

describe('DeliveryOrderAssignmentChangeComponent', () => {
  let component: DeliveryOrderAssignmentChangeComponent;
  let fixture: ComponentFixture<DeliveryOrderAssignmentChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOrderAssignmentChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderAssignmentChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
