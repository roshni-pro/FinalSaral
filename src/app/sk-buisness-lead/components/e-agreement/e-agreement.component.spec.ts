import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EAgreementComponent } from './e-agreement.component';

describe('EAgreementComponent', () => {
  let component: EAgreementComponent;
  let fixture: ComponentFixture<EAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
