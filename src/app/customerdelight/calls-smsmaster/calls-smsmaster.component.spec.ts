import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsSMSMasterComponent } from './calls-smsmaster.component';

describe('CallsSMSMasterComponent', () => {
  let component: CallsSMSMasterComponent;
  let fixture: ComponentFixture<CallsSMSMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsSMSMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsSMSMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
