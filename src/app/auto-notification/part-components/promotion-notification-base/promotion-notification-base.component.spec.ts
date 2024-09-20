import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionNotificationBaseComponent } from './promotion-notification-base.component';

describe('PromotionNotificationBaseComponent', () => {
  let component: PromotionNotificationBaseComponent;
  let fixture: ComponentFixture<PromotionNotificationBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionNotificationBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionNotificationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
