import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCheckerComponent } from './offer-checker.component';

describe('OfferCheckerComponent', () => {
  let component: OfferCheckerComponent;
  let fixture: ComponentFixture<OfferCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
