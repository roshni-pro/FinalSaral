import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCapacityComponent } from './delivery-capacity.component';

describe('DeliveryCapacityComponent', () => {
  let component: DeliveryCapacityComponent;
  let fixture: ComponentFixture<DeliveryCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
