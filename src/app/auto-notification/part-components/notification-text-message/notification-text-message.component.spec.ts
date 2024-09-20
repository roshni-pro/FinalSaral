import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTextMessageComponent } from './notification-text-message.component';

describe('NotificationTextMessageComponent', () => {
  let component: NotificationTextMessageComponent;
  let fixture: ComponentFixture<NotificationTextMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationTextMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTextMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
