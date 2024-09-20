import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingConfigurationComponent } from './accounting-configuration.component';

describe('AccountingConfigurationComponent', () => {
  let component: AccountingConfigurationComponent;
  let fixture: ComponentFixture<AccountingConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
