import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadableAutoNotificationComponent } from './readable-auto-notification.component';

describe('ReadableAutoNotificationComponent', () => {
  let component: ReadableAutoNotificationComponent;
  let fixture: ComponentFixture<ReadableAutoNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadableAutoNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadableAutoNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
