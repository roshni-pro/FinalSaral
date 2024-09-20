import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomePopupComponent } from './apphome-popup.component';

describe('AppHomePopupComponent', () => {
  let component: AppHomePopupComponent;
  let fixture: ComponentFixture<AppHomePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
