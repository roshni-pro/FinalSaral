import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerBankDetailComponent } from './ladger-bank-detail.component';

describe('LadgerBankDetailComponent', () => {
  let component: LadgerBankDetailComponent;
  let fixture: ComponentFixture<LadgerBankDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerBankDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
