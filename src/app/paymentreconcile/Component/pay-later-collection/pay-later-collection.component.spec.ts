import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayLaterCollectionComponent } from './pay-later-collection.component';

describe('PayLaterCollectionComponent', () => {
  let component: PayLaterCollectionComponent;
  let fixture: ComponentFixture<PayLaterCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayLaterCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayLaterCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
