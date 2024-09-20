import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGroupDetailsComponent } from './account-group-details.component';

describe('AccountGroupDetailsComponent', () => {
  let component: AccountGroupDetailsComponent;
  let fixture: ComponentFixture<AccountGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
