import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuduNotificationComponent } from './wudu-notification.component';

describe('WuduNotificationComponent', () => {
  let component: WuduNotificationComponent;
  let fixture: ComponentFixture<WuduNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuduNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuduNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
