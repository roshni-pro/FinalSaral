import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllOfferHistoryComponent } from './view-all-offer-history.component';

describe('ViewAllOfferHistoryComponent', () => {
  let component: ViewAllOfferHistoryComponent;
  let fixture: ComponentFixture<ViewAllOfferHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllOfferHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllOfferHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
