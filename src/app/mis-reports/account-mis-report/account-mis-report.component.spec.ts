import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMIsReportComponent } from './account-mis-report.component';

describe('AccountMIsReportComponent', () => {
  let component: AccountMIsReportComponent;
  let fixture: ComponentFixture<AccountMIsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMIsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMIsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
