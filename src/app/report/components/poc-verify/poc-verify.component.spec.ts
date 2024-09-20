import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocVerifyComponent } from './poc-verify.component';

describe('PocVerifyComponent', () => {
  let component: PocVerifyComponent;
  let fixture: ComponentFixture<PocVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
