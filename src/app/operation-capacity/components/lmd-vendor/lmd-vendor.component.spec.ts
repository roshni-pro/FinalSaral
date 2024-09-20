import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmdVendorComponent } from './lmd-vendor.component';

describe('LmdVendorComponent', () => {
  let component: LmdVendorComponent;
  let fixture: ComponentFixture<LmdVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmdVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmdVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
