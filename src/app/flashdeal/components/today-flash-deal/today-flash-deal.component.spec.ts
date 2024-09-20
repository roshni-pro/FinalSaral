import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayFlashDealComponent } from './today-flash-deal.component';

describe('TodayFlashDealComponent', () => {
  let component: TodayFlashDealComponent;
  let fixture: ComponentFixture<TodayFlashDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayFlashDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayFlashDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
