import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomeBannerComponent } from './apphome-banner.component';

describe('ApphomeComponent', () => {
  let component: AppHomeBannerComponent;
  let fixture: ComponentFixture<AppHomeBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomeBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
