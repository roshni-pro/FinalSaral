import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkNotificationComponent } from './bulk-notification.component';

describe('BulkNotificationComponent', () => {
  let component: BulkNotificationComponent;
  let fixture: ComponentFixture<BulkNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
