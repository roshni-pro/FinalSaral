import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerDropDownComponent } from './ledger-drop-down.component';

describe('LedgerDropDownComponent', () => {
  let component: LedgerDropDownComponent;
  let fixture: ComponentFixture<LedgerDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
