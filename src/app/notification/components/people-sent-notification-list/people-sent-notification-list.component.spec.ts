import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSentNotificationListComponent } from './people-sent-notification-list.component';

describe('PeopleSentNotificationListComponent', () => {
  let component: PeopleSentNotificationListComponent;
  let fixture: ComponentFixture<PeopleSentNotificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleSentNotificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleSentNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
