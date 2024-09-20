import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressUpdateReqComponent } from './address-update-req.component';

describe('AddressUpdateReqComponent', () => {
  let component: AddressUpdateReqComponent;
  let fixture: ComponentFixture<AddressUpdateReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressUpdateReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressUpdateReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
