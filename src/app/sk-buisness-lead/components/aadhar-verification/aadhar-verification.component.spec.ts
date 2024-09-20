import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharVerificationComponent } from './aadhar-verification.component';

describe('AadharVerificationComponent', () => {
  let component: AadharVerificationComponent;
  let fixture: ComponentFixture<AadharVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AadharVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AadharVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
