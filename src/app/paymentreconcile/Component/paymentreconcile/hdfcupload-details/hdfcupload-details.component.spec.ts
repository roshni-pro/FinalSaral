import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HDFCUploadDetailsComponent } from './hdfcupload-details.component';

describe('HDFCUploadDetailsComponent', () => {
  let component: HDFCUploadDetailsComponent;
  let fixture: ComponentFixture<HDFCUploadDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HDFCUploadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HDFCUploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
