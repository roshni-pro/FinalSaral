import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundDeliverylistComponent } from './outbound-deliverylist.component';

describe('OutboundDeliverylistComponent', () => {
  let component: OutboundDeliverylistComponent;
  let fixture: ComponentFixture<OutboundDeliverylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundDeliverylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundDeliverylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
