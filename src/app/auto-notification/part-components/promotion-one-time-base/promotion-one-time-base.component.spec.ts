import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionOneTimeBaseComponent } from './promotion-one-time-base.component';

describe('PromotionOneTimeBaseComponent', () => {
  let component: PromotionOneTimeBaseComponent;
  let fixture: ComponentFixture<PromotionOneTimeBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionOneTimeBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionOneTimeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
