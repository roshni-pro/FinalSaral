import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLadgerBankDetailComponent } from './add-ladger-bank-detail.component';

describe('AddLadgerBankDetailComponent', () => {
  let component: AddLadgerBankDetailComponent;
  let fixture: ComponentFixture<AddLadgerBankDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLadgerBankDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLadgerBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
