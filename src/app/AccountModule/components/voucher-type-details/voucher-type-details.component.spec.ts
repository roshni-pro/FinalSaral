import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherTypeDetailsComponent } from './voucher-type-details.component';

describe('VoucherTypeDetailsComponent', () => {
  let component: VoucherTypeDetailsComponent;
  let fixture: ComponentFixture<VoucherTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
