import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFcmNotifcationComponent } from './notification-fcm-notifcation.component';

describe('NotificationFcmNotifcationComponent', () => {
  let component: NotificationFcmNotifcationComponent;
  let fixture: ComponentFixture<NotificationFcmNotifcationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationFcmNotifcationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationFcmNotifcationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
