import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMISComponent } from './account-mis.component';

describe('AccountMISComponent', () => {
  let component: AccountMISComponent;
  let fixture: ComponentFixture<AccountMISComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMISComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
