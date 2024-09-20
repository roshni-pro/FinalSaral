import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponcodesComponent } from './couponcodes.component';

describe('CouponcodesComponent', () => {
  let component: CouponcodesComponent;
  let fixture: ComponentFixture<CouponcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
