import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoNotificationLocationComponent } from './auto-notification-location.component';

describe('AutoNotificationLocationComponent', () => {
  let component: AutoNotificationLocationComponent;
  let fixture: ComponentFixture<AutoNotificationLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoNotificationLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoNotificationLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
