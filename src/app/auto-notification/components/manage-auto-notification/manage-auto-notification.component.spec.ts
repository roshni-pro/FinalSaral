import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAutoNotificationComponent } from './manage-auto-notification.component';

describe('ManageAutoNotificationComponent', () => {
  let component: ManageAutoNotificationComponent;
  let fixture: ComponentFixture<ManageAutoNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAutoNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAutoNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
