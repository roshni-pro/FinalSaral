import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPosUploadDetailsComponent } from './m-pos-upload-details.component';

describe('MPosUploadDetailsComponent', () => {
  let component: MPosUploadDetailsComponent;
  let fixture: ComponentFixture<MPosUploadDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPosUploadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPosUploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
