import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionLedgerEntryComponent } from './correction-ledger-entry.component';

describe('CorrectionLedgerEntryComponent', () => {
  let component: CorrectionLedgerEntryComponent;
  let fixture: ComponentFixture<CorrectionLedgerEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionLedgerEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionLedgerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
