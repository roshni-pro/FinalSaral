import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferHistoryAdminPageComponent } from './offer-history-admin-page.component';

describe('OfferHistoryAdminPageComponent', () => {
  let component: OfferHistoryAdminPageComponent;
  let fixture: ComponentFixture<OfferHistoryAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferHistoryAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferHistoryAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
