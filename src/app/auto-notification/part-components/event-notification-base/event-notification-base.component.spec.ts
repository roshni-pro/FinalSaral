import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNotificationBaseComponent } from './event-notification-base.component';

describe('EventNotificationBaseComponent', () => {
  let component: EventNotificationBaseComponent;
  let fixture: ComponentFixture<EventNotificationBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventNotificationBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventNotificationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
