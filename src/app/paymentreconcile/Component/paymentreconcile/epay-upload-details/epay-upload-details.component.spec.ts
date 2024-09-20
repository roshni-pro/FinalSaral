import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpayUploadDetailsComponent } from './epay-upload-details.component';

describe('EpayUploadDetailsComponent', () => {
  let component: EpayUploadDetailsComponent;
  let fixture: ComponentFixture<EpayUploadDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpayUploadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpayUploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
