import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferHistoryPageComponent } from './offer-history-page.component';

describe('OfferHistoryPageComponent', () => {
  let component: OfferHistoryPageComponent;
  let fixture: ComponentFixture<OfferHistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferHistoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
