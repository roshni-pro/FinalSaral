import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferWithUploaderComponent } from './new-offer-with-uploader.component';

describe('NewOfferWithUploaderComponent', () => {
  let component: NewOfferWithUploaderComponent;
  let fixture: ComponentFixture<NewOfferWithUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOfferWithUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfferWithUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
