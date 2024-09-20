import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeUploadComponent } from './coupon-code-upload.component';

describe('CouponCodeUploadComponent', () => {
  let component: CouponCodeUploadComponent;
  let fixture: ComponentFixture<CouponCodeUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponCodeUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
