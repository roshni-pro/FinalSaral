import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenNetworkPincodeComponent } from './open-network-pincode.component';

describe('OpenNetworkPincodeComponent', () => {
  let component: OpenNetworkPincodeComponent;
  let fixture: ComponentFixture<OpenNetworkPincodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenNetworkPincodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenNetworkPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
