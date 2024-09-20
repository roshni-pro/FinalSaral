import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTripPopupComponent } from './generate-trip-popup.component';

describe('GenerateTripPopupComponent', () => {
  let component: GenerateTripPopupComponent;
  let fixture: ComponentFixture<GenerateTripPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateTripPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTripPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
