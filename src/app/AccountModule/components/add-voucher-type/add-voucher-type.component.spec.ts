import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoucherTypeComponent } from './add-voucher-type.component';

describe('AddVoucherTypeComponent', () => {
  let component: AddVoucherTypeComponent;
  let fixture: ComponentFixture<AddVoucherTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVoucherTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVoucherTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
