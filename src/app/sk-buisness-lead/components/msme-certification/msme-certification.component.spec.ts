import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsmeCertificationComponent } from './msme-certification.component';

describe('MsmeCertificationComponent', () => {
  let component: MsmeCertificationComponent;
  let fixture: ComponentFixture<MsmeCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsmeCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsmeCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
